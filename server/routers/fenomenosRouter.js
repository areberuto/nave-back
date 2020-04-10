const express = require('express');
const { validFenomeno, compareIds } = require('../middleware/middleFenomenos');
const { db } = require('../sql/sql');
const { checkAuth } = require('../middleware/middleLogin');
const fenomenosRouter = express.Router();

//GET

fenomenosRouter.get('/', (req, res, next) => {

    //Prepara la consulta para obtener los fenómenos con el nombre y apellidos del investigador

    let query = "SELECT f.*, i.nombre as nombreInvestigador, i.apellido1 as apellidoInv1, i.apellido2 as apellidoInv2 FROM fenomenos as f INNER JOIN investigadores as i ON f.investigadorId = i.id";

    //Si la query lleva un parámetro idInv, se filtrará por idInv (para la funcionalidad de 'Mis fenómenos')

    if (req.query.idInv) {

        query = query + ` WHERE i.id = ${req.query.idInv}`;

        db.all(query, (err, rows) => {

            if (err) {

                console.log('Error en la lectura por idInv:', err);

                return next(new Error(err));

            }

            console.log('Lectura por idInv realizada con éxito.');
            res.send(rows);

        });

        return;

    }

    //Si la query lleva idFen, se traerá sólo el fenómeno con ese id (para llenar el formulario
    //en la modificación de fenómenos).

    if (req.query.idFen) {

        query = query + ` WHERE f.id = ${req.query.idFen}`;
        db.get(query, (err, row) => {

            if (err) {

                console.log('Error en la lectura por idFen:', err);
                // res.status(500).send();
                return next(new Error(err));

            }

            console.log('Lectura por idFen realizada con éxito.');
            res.send(row);

        });

        return;

    }    

    //Si no lleva parámetros, nos traemos todo.

    db.all(query, (err, rows) => {

        if (err) {

            console.log('Error en la lectura:', err);
            // res.status(500).send();
            return next(new Error(err));

        }
        
        console.log('Lectura realizada con éxito.');
        res.send(rows);

    });

});

//POST

//Previamente validamos con middleware que el usuario tenga un token y que el fenómeno a postear sea válido

fenomenosRouter.post('/', checkAuth, validFenomeno, compareIds, (req, res, next) => {

    let fenomeno = req.fenomeno;

    db.run(`INSERT INTO fenomenos (investigadorId, titulo, descripcionCorta, contenido, fecha, ciudad, pais, coordenadas) VALUES (${fenomeno.investigadorId}, '${fenomeno.titulo}', '${fenomeno.descripcionCorta}', '${fenomeno.contenido}', '${fenomeno.fecha}', '${fenomeno.ciudad}', '${fenomeno.pais}', '${fenomeno.coordenadas}')`, function (err) {

        if (err) {

            console.log(`Error en la inserción: ${err}`);
            return next(new Error(err));


        } else {

            console.log(`Inserción realizada con éxito.`)
            res.status(201).send({ status: 201 });

        }

    });

});

//PUT

//Previamente validamos con middleware que el usuario tenga un token y que el fenómeno a postear sea válido

fenomenosRouter.put('/', checkAuth, validFenomeno, compareIds, (req, res, next) => {

    let fenomeno = req.fenomeno;

    db.run(`UPDATE fenomenos SET titulo = '${fenomeno.titulo}', descripcionCorta = '${fenomeno.descripcionCorta}', contenido = '${fenomeno.contenido}', fecha = '${fenomeno.fecha}', ciudad = '${fenomeno.ciudad}', pais = '${fenomeno.pais}', coordenadas = '${fenomeno.coordenadas}' WHERE id = ${fenomeno.id}`, function (err) {

        if (err) {

            console.log(`Error en la actualización: ${err}`);
            return next(err);

        } else {

            console.log(`Inserción realizada con éxito.`)
            let rowCount = this.changes;
            res.send({ rowCount });

        }

    });


});

//DELETE

//Previamente validamos con middleware que el usuario tenga un token válido

fenomenosRouter.delete('/', checkAuth, (req, res, next) => {

    let id = Number(req.query.id);
    console.log(id);

    //El callback será llamado con un error si hay un error en el delete, y
    //si va todo bien tendrá en su this la propiedad changes con el número de filas afectadas

    db.run(`DELETE FROM fenomenos WHERE id = ${id}`, function (err) {

        if (err) {

            console.log('Error en el borrado.')
            // res.status(500).send();
            return next(new Error(err));

        } else {

            console.log('Borrado realizado con éxito.');
            let rowCount = this.changes;
            res.send({ rowCount });

        }

    });

});

module.exports = fenomenosRouter;