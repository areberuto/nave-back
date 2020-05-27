const express = require('express');
const { db } = require('../sql/sql');
const { checkIfInvExists, validInvestigador } = require('../middleware/middleInvestigadores');
const { checkAuth } = require('../middleware/middleLogin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

investigadoresRouter.put('/updatePwd', checkAuth, checkIfInvExists, (req, res, next) => {

    const idInv = req.idInv;

    if (!req.body.oldPwd || !req.body.newPwd) {

        return res.status(400).send();

    }

    const oldPwd = req.body.oldPwd;
    const newPwd = req.body.newPwd;

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

            const match = bcrypt.compareSync(oldPwd, claveBD);

            if (match) {

                console.log("Coinciden");

                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(newPwd, salt);

                db.run(`UPDATE INVESTIGADORES SET clave = '${hash}' WHERE ID = ${idInv}`, function (err) {

                    if (err) {
            
                        console.log(`Error en la actualización: ${err}`);
                        return next(err);
            
                    } else {
            
                        console.log(`Actualización realizada con éxito.`)
                        let rowCount = this.changes;
                        res.send({ rowCount, hashedPass: hash });
            
                    }
            
                })

            } else {

                console.log("No coinciden");

            }

        }

    });

});

investigadoresRouter.put('/updateInv', checkAuth, validInvestigador, checkIfInvExists, (req, res, next) => {

    const investigador = req.investigador;

    console.log(investigador);

    db.run(`UPDATE investigadores SET correo = '${investigador.correo}', nombre = '${investigador.nombre}', apellido1 = '${investigador.apellido1}', apellido2 = '${investigador.apellido2}', organismo = '${investigador.organismo}', genero = '${investigador.genero}', ciudad = '${investigador.ciudad}', pais = '${investigador.pais}', fechaNacimiento = '${investigador.fechaNacimiento}' WHERE id = ${investigador.id}`, function (err) {

        if (err) {

            console.log(`Error en la actualización: ${err}`);
            return next(err);

        } else {

            console.log(`Actualización realizada con éxito.`)
            let rowCount = this.changes;
            res.send({ rowCount });

        }

    });



});

//Check previously that researcher exists

investigadoresRouter.delete('/delete', checkAuth, checkIfInvExists, (req, res, next) => {

    //First delete phenomena from researcher

    db.run(`DELETE FROM FENOMENOS WHERE investigadorId = ${req.idInv}`, function (err) {

        if (err) {
            console.log(err);
            return next(err);
        }

        console.log('Fenómenos borrados:', this.changes);

        db.run(`DELETE FROM INVESTIGADORES WHERE id = ${req.idInv}`, function (err) {

            if (err) {
                console.log(err);
                return next(err);
            }

            console.log('Investigadores borrados:', this.changes);
            let rowCount = this.changes;
            res.send({ rowCount });

        });

    });

});

module.exports = investigadoresRouter;