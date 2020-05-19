const { db } = require('../sql/sql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'la-clave-mas-secreta-del-mundo-hulio';

//Validación de los datos requeridos del investigador

const validSignUp = (req, res, next) => {

    console.log('Validando datos del investigador.');

    if (req.body.investigador) {

        let investigador = req.body.investigador;

        let isInvalid = (!investigador.correo || !investigador.clave || !investigador.nombre || !investigador.apellido1 || !investigador.apellido2 || !investigador.organismo || !investigador.genero || !investigador.ciudad || !investigador.fechaNacimiento);

        if (!isInvalid) {

            console.log("Investigador válido.");
            req.investigador = investigador;
            next();

        } else {

            console.log("Investigador inválido.");
            res.status(400).send();
            return;
            
        }

    } else {

    console.log('No existen datos del investigador.')
    res.status(400).send();

    }

}

//Validación de los datos del login

const validLogin = (req, res, next) => {

    let email, clave;

    if((req.body.email != '') && (req.body.clave != '')){

        email = req.body.email;
        clave = req.body.clave;

        console.log(`Datos recibidos para el check: ${email} y ${clave}.`);

    } else {

        //Si faltan datos, enviamos código de error de mala petición 400
        console.log('Faltan datos.');
        return res.status(400).send();

    }

    db.get(`SELECT id, correo, clave FROM investigadores WHERE correo = '${email}'`, (err, row) => {

        if(err){

            //Si ha habido un error en la lectura, pasamos el error al errorHandler de Express
            console.log('Error en la lectura de investigador por email.')
            return next(err);

        } else {

            if(!row){

                //Si no se ha encontrado por ese email, error 404 de vuelta
                console.log('Recurso no encontrado en la lectura de investigador por email.');
                return res.status(404).send();

            } else {

                //Comparamos la clave introducida con el hash guardado

                let match = bcrypt.compareSync(clave, row.clave);
                console.log('¿Coinciden las claves?', match);

                //Si coinciden, añadimos a la req la propiedad idInv con la id del usuario

                if(match){

                    req.email = email;
                    req.hashedPass = row.clave;
                    req.idInv = row.id;
                    return next();

                } else {

                    console.log('Clave incorrecta para el email.');
                    //Código unauthorized
                    return res.status(401).send();

                }

            }

        }

    });

}

//Comprobación de los permisos del usuario

const checkAuth = (req, res, next) => {

    console.log('Pasando por checkAuth');

    //Si la petición tiene la cabecera de autorización, extraemos el token y lo comprobamos

    if(req.headers.authorization){

        const token = req.headers.authorization.split(" ")[1];

        console.log('Comprobando token');
        
        jwt.verify(token, secretKey, (err, decoded) => {
            
            //Si es inválido, respondemos con no autorizado.

            if(err){
        
                console.log('Token inválido.');
                return res.status(401).send();
                
            } 
            
            //Si es válido, damos permiso para continuar

            else {
        
                console.log(decoded);
                req.decoded = decoded;
                return next();
                
            }
    
        });

    }
    
    //Si no tiene cabecera de autorización, respondemos con no autorizado.

    else {

        return res.status(401).send();

    }
    

};

const validRefresh = (req, res, next) => {

    console.log('Inside validRefresh');

    let email, hashedPass;

    if(req.body.email == "" || req.body.hashedPass == ""){

        return res.status(400).send();

    }

    email = req.body.email;
    hashedPass = req.body.hashedPass;

    db.get(`SELECT id, correo, clave FROM investigadores WHERE correo = '${email}'`, (err, row) => {

        if(err){

            //Si ha habido un error en la lectura, pasamos el error al errorHandler de Express
            console.log('Error en la lectura de investigador por email.')
            return next(err);

        } else {

            if(!row){

                //Si no se ha encontrado por ese email, error 404 de vuelta
                console.log('Recurso no encontrado en la lectura de investigador por email.');
                return res.status(404).send();

            } else {

                //Comparamos la clave introducida con el hash guardado

                let match = hashedPass == row.clave;

                console.log('¿Coinciden las claves?', match);

                //Si coinciden, añadimos a la req la propiedad idInv con la id del usuario

                if(match){

                    req.idInv = row.id;
                    req.email = email;
                    req.hashedPass = hashedPass;

                    return next();

                } else {

                    console.log('Clave incorrecta para el email.');
                    //Código unauthorized
                    return res.status(401).send();

                }

            }

        }

    });

}

module.exports = { validSignUp, validLogin, checkAuth, validRefresh, secretKey };
