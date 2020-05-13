const express = require('express');
const { validInvestigador, validLogin, validRefresh, checkAuth, secretKey } = require('../middleware/middleLogin');
const { db } = require('../sql/sql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();

//POST

//Validate if sign up data are valid

loginRouter.post('/register', validInvestigador, (req, res, next) => {

    let investigador = req.body.investigador;

    //Generate hash for password

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(investigador.clave, salt);

    db.run(`INSERT INTO investigadores (correo, clave, nombre, apellido1, apellido2, organismo, genero, ciudad, pais, fechaNacimiento) VALUES ('${investigador.correo}', '${hash}', '${investigador.nombre}', '${investigador.apellido1}', '${investigador.apellido2}', '${investigador.organismo}', '${investigador.genero}', '${investigador.ciudad}','${investigador.pais}', '${investigador.fechaNacimiento}')`, function (err) {

        if (err) {

            console.log(`Error en la inserción: ${err}`);
            // res.status(500).send();
            return next(new Error(err));

        } else {

            console.log(`Inserción realizada con éxito.`)
            res.status(201).send({ status: 201 });

        }

    });

});

//Validate email and password previous to sign in

loginRouter.post('/checkLogin', validLogin, (req, res, next) => {

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

loginRouter.post('/refreshAuth', validRefresh, (req, res, next) => {

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

loginRouter.post('/checkPassword', checkAuth, (req, res, next) => {

    const claveInput = req.body.clave;
    const idInv = req.decoded.sub;

    db.get(`SELECT clave FROM investigadores WHERE id = ${idInv}`, (err, row) => {

        if(err){

            console.log(err);
            return res.status(500).send();

        } else {

            if (!row) {

                console.log('Recurso no encontrado.');
                
                return res.status(404).send();

            }

            const claveBD = row.clave;

            const match = bcrypt.compareSync(claveInput, claveBD);

            if(match){

                res.send({match});

            } else {

                res.status(401).send();

            }

        }

    });

});

module.exports = loginRouter;