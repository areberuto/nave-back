const express = require('express');
const { validFenomeno, compareIdsFen, compareIdsComentario, validComentario } = require('../middleware/middleFenomenos');
const { getFenomenos, getFenomenosModerar, getFenModById, getComentarios, getCategorias, getInvestigadorById, postFenomeno, postComentario, aprobarFenomeno, updateFenomeno, deleteFenomeno, deleteComentario } = require('../sql/queries');
const { checkAuth } = require('../middleware/middleLogin');
const fenomenosRouter = express.Router();

//GET

fenomenosRouter.get('/', (req, res, next) => {

    const queryParams = req.query;

    getFenomenos(queryParams).then(result => {

        console.log("Lectura realizada con éxito:", result.length, "filas recibidas.");
        return res.send(result);

    }).catch(err => {

        console.log("Error en la lectura:", err);
        return next(err);

    });

});

fenomenosRouter.get('/moderar', checkAuth, (req, res, next) => {

    const idToken = req.decoded.sub;

    getInvestigadorById(idToken).then(result => {

        if (!result.length) {

            const msg = "Error 404 - Investigador no encontrado."
            throw new Error(msg);

        }

        if (result[0].isAdmin) {

            if (req.query.idFen) {

                return getFenomenosModerar(req.query.idFen);

            }

            return getFenomenosModerar();

        } else {

            const msg = "Error 401 - No autorizado.";
            throw new Error(msg);

        }

    }).then(result => {

        return res.send(result);

    }).catch(err => {

        console.log("Algo ha ido mal:", err);
        return next(err);

    });

});

fenomenosRouter.get("/comentarios", (req, res, next) => {

    if (!req.query.idFen) {

        const msg = "Error 400 - Petición incorrecta."
        return res.status(400).send({ msg });

    }

    const idFen = req.query.idFen;

    getComentarios(idFen).then(result => {

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

fenomenosRouter.post('/', checkAuth, validFenomeno, (req, res, next) => {

    const fenomeno = req.fenomeno;

    postFenomeno(fenomeno).then(() => {

        console.log("Inserción realizada con éxito.");
        return res.status(201).send();

    }).catch(err => {

        console.log("Error en la inserción:", err);
        return next(err);

    });

});

fenomenosRouter.post('/comentarios', checkAuth, validComentario, compareIdsComentario, (req, res, next) => {

    const comentario = req.comentario;

    postComentario(comentario).then(() => {

        console.log("Inserción realizada con éxito.");
        return res.status(201).send();

    }).catch(err => {

        console.log("Error en la inserción:", err);
        return next(err);

    });

});

//PUT

fenomenosRouter.put('/aprobar', checkAuth, (req, res, next) => {

    if (!req.body.idFen) {

        const msg = "Error 401 - Petición incorrecta.";
        return res.status(401).send(msg);
    }

    const idFen = req.body.idFen;

    getInvestigadorById(req.decoded.sub).then(result => {

        if (!result.length) {

            const msg = "Erro 404 - Investigador no encontrado.";
            throw new Error(msg);

        }

        if (result[0].isAdmin) {

            return getFenModById(idFen);

        } else {

            return res.status(401).send({ message: "Error 401 - No tiene autorización para realizar la operación." });

        }

    }).then(result => {

        if (!result.length) {

            const msg = "Error 404 - Recurso no encontrado.";
            throw new Error(msg);

        }

        return aprobarFenomeno(result[0].id);

    }).then(result => {

        console.log("Fenómeno aprobado.");
        return res.send(result);

    }).catch(err => {

        console.log("Algo ha ido mal:", err);
        return next(err);

    });

});

fenomenosRouter.put('/', checkAuth, validFenomeno, compareIdsFen, (req, res, next) => {

    const fenomeno = req.fenomeno;

    updateFenomeno(fenomeno).then((result) => {

        console.log("Actualización realizada con éxito.");
        return res.status(204).send();

    }).catch(err => {

        console.log("Error en la actualización:", err);
        return next(err);

    });

});

//DELETE

//Validate token first

fenomenosRouter.delete('/', checkAuth, compareIdsFen, (req, res, next) => {

    let id = Number(req.query.id);

    deleteFenomeno(id).then((result) => {

        console.log("Borrado realizado con éxito.");
        return res.status(204).send();

    }).catch(err => {

        console.log("Error en el borrado:", err);
        return next(err);

    });

});

fenomenosRouter.delete('/comentarios', checkAuth, compareIdsComentario, (req, res, next) => {

    let id = Number(req.query.id);

    deleteComentario(id).then(() => {

        console.log("Borrado realizado con éxito.");
        return res.status(204).send();

    }).catch(err => {

        console.log("Error en el borrado:", err);
        return next(err);

    });

});

module.exports = fenomenosRouter;