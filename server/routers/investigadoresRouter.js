const express = require('express');
const { db } = require('../sql/sql');


let investigadoresRouter = express.Router()

investigadoresRouter.get('/', (req, res, next) => {

    let query = req.query;

    if (query.hasOwnProperty('email')) {

        db.get(`SELECT * FROM investigadores WHERE correo = '${query.email}'`, (err, row) => {

            if (err) {

                console.log('Error en getInvestigadorByEmail.')
                // res.status(500).send();
                return next(err);


            } else {

                if (!row) {

                    console.log('Recurso no encontrado en getInvestigadorByEmail.');
                    // res.status(404).send();
                    return next(err);

                }

                let investigador = row;

                //Para no enviar el hash de la clave
                
                delete investigador.clave;

                return res.send(investigador);

            }

        });

    }

    else if (query.hasOwnProperty('id')) {

        //Hay que blindar aquí la password

        db.get(`SELECT * FROM investigadores WHERE id = '${query.id}'`, (err, row) => {

            if (err) {

                console.log('Error en getInvestigadorById.')

                return next(err);

            } else {

                if (!row) {

                    console.log('Recurso no encontrado en getInvestigadorId.');
                    
                    return res.status(404).send();

                }

                let investigador = row;

                //Para no enviar el hash de la clave

                delete investigador.clave;

                return res.send(investigador);

            }

        })

    } else {

        db.all(`SELECT * FROM INVESTIGADORES`, (err, rows) => {

            if (err) {

                return next(err);

            } else {

                let investigadores = rows;
                investigadores.forEach(inv => delete inv.clave);

                return res.send(investigadores);

            }

        })

    }


});

module.exports = investigadoresRouter;