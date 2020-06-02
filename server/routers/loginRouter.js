const express = require('express');
const { getCodGen, sendMail, checkIfMailExists, validSignUp, validLogin, validRefresh, checkAuth, secretKey } = require('../middleware/middleLogin');
const { registerInvestigador, getInvestigadorById, getInvestigadorByEmail, updateClave, addCodigoActivacion, getCodgenInfo, updateVerificacion, deleteCodigoByIdInv } = require('../sql/queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();

//POST

//Validate if sign up data are valid

loginRouter.post('/register', checkIfMailExists, validSignUp, (req, res, next) => {

    const investigador = req.body.investigador;
    //Generate hash for password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(investigador.clave, salt);

    registerInvestigador(investigador, hash).then(result => {

        //Cuando se ejecuta el then, el stack ha liberado las variables del bloque porque es asíncrono.
        console.log("Inserción realizada con éxito.");
        return getInvestigadorByEmail(result.correo);

    }, err => {

        throw new Error(err);

    }).then(result => {

        const idInsert = result[0].id;
        const codGen = getCodGen(40);

        return addCodigoActivacion(idInsert, result[0].correo, codGen);

    }, err => {

        throw new Error(err);

    }).then(result => {

        console.log("Inserción de código realizada con éxito.");
        sendMail(result.email, result.codGen);
        return res.status(201).send();

    }).catch(err => {

        console.log("Algo ha ido mal. - ", err);
        return next(err);

    });

});

//Lógica de verificación

loginRouter.post("/verify", (req, res, next) => {

    if (!req.body.codGen) {

        return res.status(400).send({message: "Error 400 - El código de verificación no se ha proporcionado."});

    }

    const codGen = req.body.codGen;

    getCodgenInfo(codGen).then(result => {

        if (!result.length) {

            throw new Error();

        }

        if (result[0].codigo == codGen) {

            return updateVerificacion(result[0].idInv);

        }

    }).then(idInv => {

        console.log("Verificación actualizada.")
        return deleteCodigoByIdInv(idInv);

    }).then(result => {

        return res.status(201).send();

    }).catch(err => {

        console.log("Algo ha ido mal.");
        return next(err);

    });

});

//Enviar correo para restablecer contraseña

loginRouter.post('/pwOlvidada', (req, res, next) => {

    if (!req.body.email) {

        return res.status(400).send({message: "Error 400 - El correo no se ha proporcionado."});

    }

    const correo = req.body.email;

    getInvestigadorByEmail(correo).then(result => {

        if (!result.length) {

            console.log("Recurso no encontrado en getInvestigadorByEmail.");
            throw new Error();

        }

        const codGen = getCodGen(40);

        return addCodigoActivacion(result[0].id, result[0].correo, codGen);

    }).then(result => {

        console.log("Inserción de código realizada con éxito.");
        sendMail(result.email, result.codGen, true);

        return res.status(201).send();

    }).catch(err => {

        return next(err);

    });

});

//Reseteo de la contraseña

loginRouter.post("/resetPwd", (req, res) => {

    if (!req.body.tmpClave || !req.body.tmpClaveSHA) {

        return res.status(400).send();

    }

    const tmpClave = req.body.tmpClave;
    const tmpClaveSHA = req.body.tmpClaveSHA;

    getCodgenInfo(tmpClave).then(result => {

        if (!result.length) {

            throw new Error();

        }

        if (result[0].codigo == tmpClave) {

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(tmpClaveSHA, salt);

            return updateClave(hash, result[0].idInv)

        }

    }).then(result => {

        return deleteCodigoByIdInv(result.idInv);

    }).then(result => {

        console.log("Reseteo de clave realizado con éxito. Registro de código borrado.")
        return res.status(201).send();

    }).catch(err => {

        console.log("Algo ha ido mal.");
        return next(err);

    });

});

//Validate email and password previous to sign in

loginRouter.post('/checkLogin', validLogin, (req, res) => {

    //First sign() parameter refers to JWT payload.
    //Second parameter refers to secret signing key.
    //Third parameter refers to used algorithm, expiring time and subject of token.

    //Result equals Base64url encrypted token sent after sign in.

    let jwtBearerToken = jwt.sign({}, secretKey, {

        algorithm: 'HS256',
        //Units: seconds
        expiresIn: 600,
        subject: req.idInv.toString()

    });

    return res.send({

        idToken: jwtBearerToken,
        idInv: req.idInv,
        isAdmin: req.isAdmin,
        email: req.email,
        hashedPass: req.hashedPass

    });

});

//Generate new token, for page refreshing

loginRouter.post('/refreshAuth', validRefresh, (req, res) => {

    console.log("req en refreshAuth", req);
    
    let jwtBearerToken = jwt.sign({

    }, secretKey, {

        algorithm: 'HS256',
        expiresIn: 600,
        subject: req.idInv.toString()

    });

    res.send({

        idToken: jwtBearerToken,
        idInv: req.idInv,
        isAdmin: req.isAdmin,
        email: req.email,
        hashedPass: req.hashedPass

    });

});

//Validate password stored in client for auth refresh

loginRouter.post('/checkPassword', checkAuth, (req, res) => {

    const claveInput = req.body.clave;
    const idInv = req.decoded.sub;

    getInvestigadorById(idInv).then(result => {

        if (!result.length) {

            throw new Error("Investigador no encontrado.");

        }

        const claveBD = result[0].clave;

        const match = bcrypt.compareSync(claveInput, claveBD);

        if (match) {

            return res.send({ match });

        } else {

            return res.status(401).send({message: "La clave no es correcta."});

        }

    }).catch(err => {

        console.log("Algo ha ido mal.");
        return next(err);

    })

});

module.exports = loginRouter;