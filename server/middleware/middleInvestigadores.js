const { db } = require('../sql/sql');

//GET

const checkIfInvExists = (req, res, next) => {

    const idInv = req.query.idInv;
    
    db.get(`SELECT * FROM INVESTIGADORES WHERE id = ${idInv}`, (err, row) => {

        if(err){
            
            console.log(err);
            return next(err);
            
        } else {

            if(!row){

                return res.status(404).send();

            }

            req.idInv = req.query.idInv;
            
            return next();
            
        }

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

module.exports = {checkIfInvExists, validInvestigador};