const express = require('express');
const { getCodGen, sendMail, validSignUp, validLogin, validRefresh, checkAuth, secretKey } = require('../middleware/middleLogin');
const { db } = require('../sql/sql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();

//POST

//Validate if sign up data are valid

loginRouter.post('/register', validSignUp, (req, res, next) => {

    let investigador = req.body.investigador;

    //Generate hash for password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(investigador.clave, salt);

    db.run(`INSERT INTO investigadores (correo, clave, nombre, apellido1, apellido2, organismo, genero, ciudad, pais, fechaNacimiento, verificado) VALUES ('${investigador.correo}', '${hash}', '${investigador.nombre}', '${investigador.apellido1}', '${investigador.apellido2}', '${investigador.organismo}', '${investigador.genero}', '${investigador.ciudad}','${investigador.pais}', '${investigador.fechaNacimiento}', 0)`, function (err) {

        if (err) {

            console.log(`Error en la inserción: ${err}`);
            return next(err);

        } else {

            console.log(`Inserción realizada con éxito.`);

            db.get(`SELECT id FROM investigadores WHERE correo = '${investigador.correo}'`, (err, row) => {

                if (err) {

                    console.log("Error en la lectura:", err);
                    return next(err);

                }

                else {

                    const idInv = row.id;
                    console.log("idInv", idInv);
                    console.log("rowId", row.id);
                    codGen = getCodGen(40);

                    db.run(`INSERT INTO codigos_activacion (idInv, email, codigo) VALUES ('${idInv}', '${investigador.correo}', '${codGen}')`, function (err) {

                        if (err) {

                            console.log(`Error en la inserción: ${err}`);
                            return next(new Error(err));

                        }

                        else {

                            sendMail(investigador.correo, codGen);
                            res.status(201).send();

                        }

                    });

                }

            });

        }

    });

});

//Lógica de verificación

loginRouter.post("/verify", (req, res, next) => {

    if (!req.body.codGen) {

        return res.status(400).send();

    }

    const codGen = req.body.codGen;

    db.get(`SELECT * FROM codigos_activacion WHERE codigo = '${codGen}'`, (err, row) => {

        if (err) {

            console.log("Ha ocurrido un error:", err);
            return next(err);

        } else {

            if (row.codigo == codGen) {

                db.run(`UPDATE investigadores SET verificado = '1' WHERE ID = ${row.idInv}`, function (err) {

                    if (err) {

                        console.log("Error en la actualización:", err);
                        return next(err);

                    } else {

                        const rowCount = this.changes;
                        console.log("Actualización de", rowCount, "filas");

                        db.run(`DELETE FROM codigos_activacion WHERE idInv = ${row.idInv}`, function (err) {

                            if (err) {

                                console.log("Error en el borrado:", err);
                                return next(err);

                            } else {

                                console.log("Verificación realizada con éxito. Código de activación borrado.")
                                return res.status(201).send();

                            }

                        })

                    }

                });

            }

        }

    });

})

//Enviar correo para restablecer contraseña

loginRouter.post('/pwOlvidada', (req, res) => {

    console.log(req.body);

    if (!req.body.email) {

        return res.status(400).send();

    }

    const correo = req.body.email;

    db.get(`SELECT * FROM investigadores WHERE correo = '${correo}'`, (err, row) => {

        if (err) {

            console.log("Error en el SELECT:", err);
            return next(err);

        } else {

            if (row) {

                //Menor seguridad, pero es una clave temporal.
                const codGen = getCodGen(40);

                db.run(`INSERT INTO codigos_activacion (idInv, email, codigo) VALUES ('${row.id}', '${correo}', '${codGen}')`, function (err) {

                    if (err) {

                        console.log(`Error en la inserción: ${err}`);
                        return next(new Error(err));

                    }

                    else {

                        sendMail(correo, codGen, true);
                        res.status(201).send();

                    }

                });

            } else {

                return res.status(404).send("No hay ninguna cuenta asociada a ese correo.");

            }

        }
    })

});

//Reseteo de la contraseña

loginRouter.post("/resetPwd", (req, res) => {

    if(!req.body.tmpClave || !req.body.tmpClaveSHA){

        return res.status(400).send();

    }

    const tmpClave = req.body.tmpClave;
    const tmpClaveSHA = req.body.tmpClaveSHA;

    console.log("tmpClave recibida", tmpClave)

    db.get(`SELECT * FROM codigos_activacion WHERE codigo = '${tmpClave}'`, (err, row) => {

        if (err) {

            console.log("Ha ocurrido un error:", err);
            return next(err);

        } else {

            if (row.codigo == tmpClave) {

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(tmpClaveSHA, salt);

                db.run(`UPDATE investigadores SET clave = '${hash}' WHERE ID = ${row.idInv}`, function (err) {

                    if (err) {

                        console.log("Error en la actualización:", err);
                        return next(err);

                    } else {

                        const rowCount = this.changes;
                        console.log("Actualización de", rowCount, "filas");

                        db.run(`DELETE FROM codigos_activacion WHERE idInv = ${row.idInv}`, function (err) {

                            if (err) {

                                console.log("Error en el borrado:", err);
                                return next(err);

                            } else {

                                console.log("Reseteo de clave realizado con éxito. Registro de código borrado.")
                                return res.status(201).send();

                            }

                        });

                    }

                });

            }

        }

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
        expiresIn: 300,
        subject: req.idInv.toString()

    });

    res.send({

        idToken: jwtBearerToken,
        idInv: req.idInv,
        isAdmin: false,
        email: req.email,
        hashedPass: req.hashedPass

    });

});

//Generate new token, for page refreshing

loginRouter.post('/refreshAuth', validRefresh, (req, res) => {

    let jwtBearerToken = jwt.sign({

    }, secretKey, {

        algorithm: 'HS256',
        expiresIn: 300,
        subject: req.idInv.toString()

    });

    res.send({

        idToken: jwtBearerToken,
        idInv: req.idInv,
        isAdmin: false,
        email: req.email,
        hashedPass: req.hashedPass

    });

});

//Validate password stored in client for auth refresh

loginRouter.post('/checkPassword', checkAuth, (req, res) => {

    const claveInput = req.body.clave;
    const idInv = req.decoded.sub;

    db.get(`SELECT clave FROM investigadores WHERE id = ${idInv}`, (err, row) => {

        if (err) {

            console.log(err);
            return res.status(500).send();

        } else {

            if (!row) {

                console.log('Recurso no encontrado.');

                return res.status(404).send();

            }

            const claveBD = row.clave;

            const match = bcrypt.compareSync(claveInput, claveBD);

            if (match) {

                return res.send({ match });

            } else {

                return res.status(401).send();

            }

        }

    });

});

module.exports = loginRouter;