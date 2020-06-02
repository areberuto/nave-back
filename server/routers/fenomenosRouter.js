const express = require('express');
const { validFenomeno, compareIds } = require('../middleware/middleFenomenos');
const { getFenomenos, getCategorias, postFenomeno, updateFenomeno, deleteFenomeno } = require('../sql/queries');
const { checkAuth } = require('../middleware/middleLogin');
const fenomenosRouter = express.Router();

//GET

fenomenosRouter.get('/', (req, res, next) => {

    //Prepares query, returning full name of researcher

    let sql = "SELECT f.*, i.nombre as nombreInvestigador, i.apellido1 as apellidoInv1, i.apellido2 as apellidoInv2, c.categoria FROM fenomenos as f INNER JOIN investigadores as i ON f.investigadorId = i.id INNER JOIN categorias as c ON f.categoria = c.id";
    
    const queryparams = req.query;

    if(Object.keys(queryparams).length != 0){

        let idInvSql = "", ciudadSql = "", paisSql = "", fechaInicioSql = "", fechaFinSql = "", textoSql = "", idFenSql = "";
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

        if(queryparams.idFen){
            
            idFenSql = `f.id = ${queryparams.idFen}`;

            if(!startAnd){

                sql += idFenSql;
                startAnd = true;

            } else {

                sql += ` AND ${idFenSql}`;
                
            }

        }

    }

    sql += " ORDER BY FECHA DESC";
    
    getFenomenos(sql).then(result => {

        console.log("Lectura realizada con éxito:", result.length, "filas recibidas.");
        return res.send(result);

    }).catch(err => {

        console.log("Error en la lectura:", err);
        return next(err);

    });

});

fenomenosRouter.get("/categorias", (req, res, next) => {

    getCategorias().then(result => {

        console.log("Lectura realizada con éxito:", result.length, "filas recibidas.");
        return res.send(result);

    }).catch(err => {

        console.log("Error en la lectura:", err);
        return next(err);

    });

});

//POST

//Validate token, phenomena, and in case of update also validate ids

fenomenosRouter.post('/', checkAuth, validFenomeno, compareIds, (req, res, next) => {

    const fenomeno = req.fenomeno;

    postFenomeno(fenomeno).then(() => {

        console.log("Inserción realizada con éxito.");
        return res.status(201).send();

    }).catch(err => {

        console.log("Error en la inserción:", err);
        return next(err);

    });

});

//PUT

//Validate token, phenomena, and in case of update also validate ids

fenomenosRouter.put('/', checkAuth, validFenomeno, compareIds, (req, res, next) => {

    const fenomeno = req.fenomeno;

    const sql = `UPDATE fenomenos SET categoria = ${fenomeno.categoria}, titulo = '${fenomeno.titulo}', descripcionCorta = '${fenomeno.descripcionCorta}', contenido = '${fenomeno.contenido}', fecha = '${fenomeno.fecha}', ciudad = '${fenomeno.ciudad}', pais = '${fenomeno.pais}', latitud = ${fenomeno.latitud}, longitud = ${fenomeno.longitud} WHERE id = ${fenomeno.id}`;

    updateFenomeno(sql).then((result) => {

        console.log("Actualización realizada con éxito.");
        return res.status(204).send();

    }).catch(err => {

        console.log("Error en la actualización:", err);
        return next(err);

    });

});

//DELETE

//Validate token first

fenomenosRouter.delete('/', checkAuth, (req, res, next) => {

    let id = Number(req.query.id);
    
    deleteFenomeno(id).then((result) => {

        console.log("Borrado realizado con éxito.");
        return res.status(204).send();

    }).catch(err => {

        console.log("Error en el borrado:", err);
        return next(err);

    });

});

module.exports = fenomenosRouter;