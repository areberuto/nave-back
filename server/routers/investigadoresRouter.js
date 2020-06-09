const express = require('express');
const { checkIfInvExists, validInvestigador, compareIdsInv } = require('../middleware/middleInvestigadores');
const { checkAuth } = require('../middleware/middleLogin');
const { getInvestigadores, getInvestigadorByEmail, getInvestigadorById, getClaveInvestigador, updateInvestigador, updateClave, deleteFenomenosByInv, deleteInvestigador } = require('../sql/queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let investigadoresRouter = express.Router()

investigadoresRouter.get('/', (req, res, next) => {

    const query = req.query;

    if (query.hasOwnProperty('email')) {

        getInvestigadorByEmail(query.email).then(result => {

            if (!result.length) {

                return res.status(404).send();

            }

            const investigador = result[0];

            //Para no enviar el hash de la clave

            delete investigador.clave;

            return res.send(investigador);

        }).catch(err => {

            return next(err);

        });

    }

    else if (query.hasOwnProperty('id')) {

        getInvestigadorById(query.id).then(result => {

            if (!result.length) {

                const msg = "Error 404 - Investigador no encontrado."
                return res.status(404).send({msg});

            }

            const investigador = result[0];

            //Para no enviar el hash de la clave

            delete investigador.clave;

            return res.send(investigador);

        }).catch(err => {

            return next(err);

        });

    } else {

        getInvestigadores().then(result => {

            const investigadores = result;

            investigadores.forEach(inv => delete inv.clave);

            return res.send(investigadores);

        }).catch(err => {

            return next(err);

        });

    }

});

investigadoresRouter.put('/updatePwd', checkAuth, checkIfInvExists, (req, res, next) => {

    const idInv = req.idInv;

    if (!req.body.oldPwd || !req.body.newPwd) {

        const message = "Error 400 - Falta información para actualizar la contraseña.";
        return res.status(400).send({message});

    }

    const oldPwd = req.body.oldPwd;
    const newPwd = req.body.newPwd;

    getClaveInvestigador(idInv).then(result => {

        if (!Object.keys(result[0]).length) {

            throw new Error('Recurso no encontrado');

        }

        const claveBD = result[0].clave;
        const match = bcrypt.compareSync(oldPwd, claveBD);

        if (match) {

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(newPwd, salt);

            return updateClave(hash, idInv);

        } else {

            console.log("No coinciden las claves.");
            throw new Error("No coinciden las claves.");

        }

    }).then(result => {

        console.log(`Actualización realizada con éxito.`);
        return res.send({ hashedPass: result.hash });

    }).catch(err => {

        console.log("Algo ha ido mal al obtener/actualizar la clave.")
        return next(err);

    });

});

investigadoresRouter.put('/updateInv', checkAuth, validInvestigador, checkIfInvExists, (req, res, next) => {

    const investigador = req.investigador;

    updateInvestigador(investigador).then(result => {

        return res.status(201).send(result);

    }, err => {

        console.log("Algo ha ido mal:", err);
        return next(err);

    });

});

//Check previously that researcher exists

investigadoresRouter.delete('/delete', checkAuth, checkIfInvExists, compareIdsInv, (req, res, next) => {

    const idInv = req.query.idInv;
    
    deleteFenomenosByInv(idInv).then((result) => {

        console.log("Borrado de fenómenos - OK");
        return deleteInvestigador(idInv);

    }, err => {

        console.log("Error en el borrado de fenómenos:", err);
        throw new Error(err);

    }).then((result) => {

        console.log("Investigadores borrados:", result.affectedRows);
    
        const rowCount = result.affectedRows;
    
        return res.status(201).send({rowCount});

    }, err => {

        console.log("Error en el borrado:", err);
        return next(err);

    });

});

module.exports = investigadoresRouter;