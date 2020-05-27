const express = require('express');
const { validFenomeno, compareIds } = require('../middleware/middleFenomenos');
const { db } = require('../sql/sql');
const { checkAuth } = require('../middleware/middleLogin');
const fenomenosRouter = express.Router();

//GET

fenomenosRouter.get('/', (req, res, next) => {

    //Prepares query, returning full name of researcher

    let sql = "SELECT f.*, i.nombre as nombreInvestigador, i.apellido1 as apellidoInv1, i.apellido2 as apellidoInv2, c.categoria FROM fenomenos as f INNER JOIN investigadores as i ON f.investigadorId = i.id INNER JOIN categorias as c ON f.categoria = c.id";
    
    //Considerar LIKE = %value%

    console.log(req.query);

    const queryparams = req.query;

    if(Object.keys(queryparams).length != 0){

        let idInvSql = "", ciudadSql = "", paisSql = "", fechaInicioSql = "", fechaFinSql = "", textoSql = "";
        let startAnd = false;

        sql += " WHERE "

        if(queryparams.idInv){

            idInvSql = "i.id IN (" + queryparams.idInv.toString() + ")";
            
            sql += idInvSql;
            startAnd = true;

        }

        if(queryparams.ciudad){
            
            ciudadSql = "f.ciudad LIKE '%" + queryparams.ciudad + "%'";

            if(!startAnd){

                sql += ciudadSql;
                startAnd = true;

            } else {

                sql += ` AND ${ciudadSql}`;

            }

        }

        if(queryparams.pais){
            
            paisSql = "f.pais LIKE '%" + queryparams.pais + "%'";

            if(!startAnd){

                sql += paisSql;
                startAnd = true;

            } else {

                sql += ` AND ${paisSql}`;
                
            }

        }

        if(queryparams.texto){
            
            textoSql = "(f.titulo LIKE '%" + queryparams.texto + "%' OR f.descripcion LIKE '%" + queryparams.texto + "%' OR f.contenido LIKE '%" + queryparams.texto + "%')";

            if(!startAnd){

                sql += textoSql;
                startAnd = true;

            } else {

                sql += ` AND ${textoSql}`;
                
            }

        }

        if(queryparams.fechaInicio){

            fechaInicioSql = `f.fecha >= '${queryparams.fechaInicio}'`;

            if(!startAnd){

                sql += fechaInicioSql;
                startAnd = true;

            } else {

                sql += ` AND '${fechaInicioSql}'`;
                
            }

        }

        if(queryparams.fechaFin){

            fechaFinSql = `f.fecha <= '${queryparams.fechaFin}'`;

            if(!startAnd){

                sql += fechaFinSql;
                startAnd = true;

            } else {

                sql += ` AND '${fechaFinSq}'`;
                
            }

        }

        

    }

    console.log(sql);

    db.all(sql, (err, rows) => {

        if (err) {

            console.log('Error en la lectura:', err);
            // res.status(500).send();
            return next(new Error(err));

        }
        
        console.log('Lectura realizada con éxito.', `${rows.length} filas.`);
        res.send(rows);

    });

});

//POST

//Validate token, phenomena, and in case of update also validate ids

fenomenosRouter.post('/', checkAuth, validFenomeno, compareIds, (req, res, next) => {

    let fenomeno = req.fenomeno;

    db.run(`INSERT INTO fenomenos (investigadorId, titulo, descripcionCorta, contenido, fecha, ciudad, pais, latitud, longitud) VALUES (${fenomeno.investigadorId}, '${fenomeno.titulo}', '${fenomeno.descripcionCorta}', '${fenomeno.contenido}', '${fenomeno.fecha}', '${fenomeno.ciudad}', '${fenomeno.pais}', '${fenomeno.latitud}', '${fenomeno.longitud}')`, function (err) {

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

//Validate token, phenomena, and in case of update also validate ids

fenomenosRouter.put('/', checkAuth, validFenomeno, compareIds, (req, res, next) => {

    let fenomeno = req.fenomeno;

    db.run(`UPDATE fenomenos SET titulo = '${fenomeno.titulo}', descripcionCorta = '${fenomeno.descripcionCorta}', contenido = '${fenomeno.contenido}', fecha = '${fenomeno.fecha}', ciudad = '${fenomeno.ciudad}', pais = '${fenomeno.pais}', latitud = '${fenomeno.latitud}, longitud = '${fenomeno.longitud}' WHERE id = ${fenomeno.id}`, function (err) {

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

//DELETE

//Validate token first

fenomenosRouter.delete('/', checkAuth, (req, res, next) => {

    let id = Number(req.query.id);
    console.log(id);

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