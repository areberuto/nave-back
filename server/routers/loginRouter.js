const express = require('express');
const { validInvestigador, validLogin, validRefresh, checkAuth, secretKey } = require('../middleware/middleLogin');
const { db } = require('../sql/sql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();

//POST

//Previamente al registro de un usuario, validamos con middleware que tenga los datos requeridos

loginRouter.post('/register', validInvestigador, (req, res, next) => {

    let investigador = req.body.investigador;

    //Generamos el hash de su clave para guardarlo en la BD

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

//Previamente validamos que el correo exista y la clave coincida con ese correo

loginRouter.post('/checkLogin', validLogin, (req, res, next) => {

    //El primer parámetro de sign() es el payload, que se añadirá al payload del JWT.
    //El segundo es la clave secreta para el hash, o la clave secreta del RSA.
    //El tercero es para declarar el algoritmo usado, el tiempo de expiración y el sujeto del JWT (a quién identifica).

    //El resultado será el token encriptado en Base64url

    let jwtBearerToken = jwt.sign({}, secretKey, {

        algorithm: 'HS256',
        //En segundos
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

loginRouter.post('/refreshAuth', validRefresh, (req, res, next) => {

    //El primer parámetro de sign() es el payload, que se añadirá al payload del JWT.
    //El segundo es la clave secreta para el hash, o la clave secreta del RSA.
    //El tercero es para declarar el algoritmo usado, el tiempo de expiración y el sujeto del JWT (a quién identifica).

    //El resultado será el token encriptado en Base64url

    let jwtBearerToken = jwt.sign({

    }, secretKey, {

        algorithm: 'HS256',
        //En segundos
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