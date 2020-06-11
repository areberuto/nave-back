const { isValidRefresh, getInvestigadorByEmail } = require('../sql/queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const secretKey = 'la-clave-mas-secreta-del-mundo-hulio';

//Nodemailer

const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {

        //Empty. User and pass for sender mail account.
        user: '',
        pass: ''

    }

});

const sendMail = (email, codGen, olvidada = false) => {

    let mensaje;

    if (!olvidada) {

        mensaje = `<div style='font-family: Arial, Helvetica, sans-serif; text-align: center; margin: 10px; padding: 20px'><h1>🔮 ¡Hola! 🔮</h1><h2>Bienvenido/a a la nave del misterio.</h2><p>Para empezar a utilizar la plataforma tendrás que verificar tu cuenta.</p><p>Si no te has registrado en nuestra página, por favor, ignora este mensaje.</p><a href='http://localhost:4200?codGen=${codGen}' type='button' href='_blank'>Verificar mi cuenta</a></div>`

    } else {

        mensaje = `<div style='font-family: Arial, Helvetica, sans-serif; text-align: center; margin: 10px; padding: 20px'><h1>🔮 ¡Hola! 🔮</h1><h2>Aquí tienes tu nueva contraseña.</h2><h3>${codGen}</h3><p>Hemos generado una nueva contraseña para que puedas entrar en nuestra plataforma. Haz click en el enlace para activarla, y establece de inmediato en <strong>Mi perfil</strong> una nueva contraseña.</p><p>Si no esperabas este correo, te recomendamos que modifiques tu contraseña actual para reforzar la seguridad de tu cuenta.</p><a href='http://localhost:4200?tmpClave=${codGen}' type='button' href='_blank'>Restablecer contraseña</a></div>`
    }

    const mailOptions = {

        from: 'areberutodev@gmail.com',
        to: email,
        subject: 'Verifica tu cuenta de La Nave del Misterio',
        html: mensaje

    }

    transporter.sendMail(mailOptions, function(error, info) {

        if (error) {

            console.log(error);

        } else {

            console.log("Email enviado.");

        }

    });

}

//Validación de los datos requeridos del investigador

const validSignUp = (req, res, next) => {

    if (req.body.investigador) {

        const investigador = req.body.investigador;

        const isInvalid = (!investigador.correo || !investigador.clave || !investigador.nombre || !investigador.apellido1 || !investigador.apellido2 || !investigador.organismo || !investigador.genero || !investigador.ciudad || !investigador.fechaNacimiento);

        if (!isInvalid) {

            req.investigador = investigador;
            return next();

        } else {

            res.status(400).send({ message: "Error 400 - Hay datos incorrectos en relación al registro." });
            return;

        }

    } else {

        return res.status(400).send({ message: "Error 400 - No se han proporcionado datos para el registro." });

    }

}

//Validación de los datos del login

const validLogin = (req, res, next) => {

    let email, clave;

    if ((req.body.email != '') && (req.body.clave != '')) {

        email = req.body.email;
        clave = req.body.clave;

    } else {

        return res.status(400).send({ message: "Error 400 - Login inválido, faltan credenciales." });

    }

    getInvestigadorByEmail(email).then(result => {

        if (!result.length) {

            return res.status(404).send({ message: "Error 404 - Recurso no encontrado." });

        }

        const investigador = result[0];

        const match = bcrypt.compareSync(clave, investigador.clave);
        console.log('¿Coinciden las claves?', match);

        //Si coinciden, añadimos a la req la propiedad idInv con la id del usuario

        if (match) {

            req.email = email;
            req.hashedPass = investigador.clave;
            req.idInv = investigador.id;
            req.isAdmin = !!investigador.isAdmin;

            console.log("Verificado", !!investigador.verificado);

            if (investigador.verificado) {

                return next();

            } else {

                return res.status(401).send({ message: "Error 401 - Cuenta no verificada." });

            }

        } else {

            return res.status(401).send({ message: "Error 401 - Clave incorrecta." });

        }

    }).catch(err => {

        console.log("Algo ha ido mal.");
        return next(err);

    })

}

//Obtener string aleatoria

const getCodGen = length => {

    let codGen = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chLength = characters.length;

    for (let i = 0; i < length; i++) {

        codGen += characters.charAt(Math.floor(Math.random() * chLength));

    }

    return codGen;

}

//Comprobación de los permisos del usuario

const checkAuth = (req, res, next) => {

    //Si la petición tiene la cabecera de autorización, extraemos el token y lo comprobamos

    if (req.headers.authorization) {

        const token = req.headers.authorization.split(" ")[1];

        console.log('Comprobando token...');

        jwt.verify(token, secretKey, (err, decoded) => {

            //Si es inválido, respondemos con no autorizado.

            if (err) {

                return res.status(401).send({ message: "El token de sesión es inválido o ha expirado. Vuelve a iniciar sesión con tus credenciales." });

            }

            //Si es válido, damos permiso para continuar
            
            else {

                req.decoded = decoded;
                return next();

            }

        });

    }

    //Si no tiene cabecera de autorización, respondemos con no autorizado.

    else {

        return res.status(401).send({ message: "Error 401 - Falta token de autorización." });

    }


};

const validRefresh = (req, res, next) => {

    let email, hashedPass;

    if (req.body.email == "" || req.body.hashedPass == "") {

        return res.status(400).send({ message: "Error 400 - Faltan credenciales para renovar la sesión." });

    }

    email = req.body.email;
    hashedPass = req.body.hashedPass;

    isValidRefresh(email).then(result => {

        if (!result.length) {

            //Si no se ha encontrado por ese email, error 404 de vuelta
            console.log("Recurso no encontrado en la lectura de investigador por email.");
            throw new Error("Recurso no encontrado.");

        }

        //Comparamos la clave introducida con el hash guardado

        const match = hashedPass == result[0].clave;

        console.log('¿Coinciden las claves?', match);

        //Si coinciden, añadimos a la req la propiedad idInv con la id del usuario

        if (match) {

            req.idInv = result[0].id;
            req.isAdmin = !!result[0].isAdmin;
            req.email = email;
            req.hashedPass = hashedPass;

            return next();

        } else {

            console.log("Clave incorrecta para el email.");

            return res.status(401).send({ message: "La clave no es correcta." });

        }

    }).catch(err => {

        console.log("Algo ha ido mal.");
        return next(err);

    })

}

module.exports = { getCodGen, sendMail, validSignUp, validLogin, checkAuth, validRefresh, secretKey };