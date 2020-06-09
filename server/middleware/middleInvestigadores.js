const { getInvestigadorById } = require('../sql/queries');

//GET

const checkIfInvExists = (req, res, next) => {

    const idInv = req.query.idInv;

    getInvestigadorById(idInv).then(result => {

        if(!result.length){

            return res.status(404).send({message: "Error 404 - Recurso no encontrado."});

        }

        req.idInv = idInv;
            
        return next();

    }, err => {

        return next(err);

    });

}

const validInvestigador = (req, res, next) => {

    console.log('Validando datos del investigador.');

    if (req.body.investigador) {

        let investigador = req.body.investigador;

        let isInvalid = (!investigador.correo || !investigador.nombre || !investigador.apellido1 || !investigador.apellido2 || !investigador.organismo || !investigador.genero || !investigador.ciudad || !investigador.fechaNacimiento);

        if (!isInvalid) {

            console.log("Investigador válido.");
            req.investigador = investigador;
            return next();

        } else {

            console.log("Investigador inválido.");
            return res.status(400).send({message: "Error 400 - Datos del investigador inválidos."});
            
        }

    } else {

        return res.status(400).send({message: "Error 400 - No existen datos del investigador."});

    }

}

const compareIdsInv = (req, res, next) => {
    
    console.log("Validando id del autor del borrado... ");

    const idToken = req.decoded.sub;
    //Primer caso cuando es un PUT, segundo caso cuando es un DELETE
    const idInv = req.query.idInv;

    if(idToken == idInv){

        return next();

    } else {

        console.log("El investigador que borra no es él mismo.");

        getInvestigadorById(idToken).then(result => {

            if(!result.length){

                return res.status(404).send({message: "Error 404 - Recurso no encontrado."});

            }

            if(result[0].isAdmin){

                console.log("Pero es administrador/a.")
                return next();

            } else {

                return res.status(401).send({message: "Error 401 - No tiene autorización para realizar la operación."});

            }

        }, err => {

            console.log("Algo ha ido mal.");
            return next(err);

        });

    }

}

module.exports = {checkIfInvExists, validInvestigador, compareIdsInv};