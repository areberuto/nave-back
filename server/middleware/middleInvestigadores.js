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

module.exports = {checkIfInvExists, validInvestigador};