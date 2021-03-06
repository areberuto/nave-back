const { getInvestigadorById } = require('../sql/queries');

//Validación de los datos requeridos del fenómeno

const validFenomeno = (req, res, next) => {

    console.log("Validando datos del fenómeno... ");

    if (req.body.fenomeno) {

        const fenomeno = req.body.fenomeno;

        const isInvalid = (!fenomeno.investigadorId || !fenomeno.titulo || !fenomeno.descripcionCorta || !fenomeno.contenido || !fenomeno.latitud || !fenomeno.longitud || !fenomeno.fecha || !fenomeno.ciudad || !fenomeno.pais);

        if (!isInvalid) {

            console.log("Fenómeno válido.");
            req.fenomeno = fenomeno;
            return next();

        } else {

            console.log("Fenómeno inválido.");
            return res.status(400).send({ message: "Error 400 - Datos del fenómeno inválidos." });

        }

    }

    return res.status(400).send({ message: "Error 400 - Datos del fenómeno no proporcionados." });

}

//Validación del comentario

const validComentario = (req, res, next) => {

    console.log("Validando datos del comentario... ");

    if (req.body.comentario) {

        const comentario = req.body.comentario;

        const isInvalid = (!comentario.investigadorId || !comentario.fenomenoId || !comentario.comentario);

        if (!isInvalid) {

            console.log("Comentario válido.");
            req.comentario = comentario;
            return next();

        } else {

            console.log("Comentario inválido.");
            return res.status(400).send({ message: "Error 400 - Datos del comentario inválidos." });

        }

    }

    return res.status(400).send({ message: "Error 400 - Datos del comentario no proporcionados." });

}

//Comparación de Id del investigador que hace petición y la idInv del fenómeno

const compareIdsFen = (req, res, next) => {

    console.log("Validando que el fenómeno sea de su investigador... ");

    const idToken = req.decoded.sub;
    //Primer caso cuando es un DELETE, segundo caso cuando es un PUT
    const idInvFen = req.query.id || req.fenomeno.investigadorId;

    if (idToken == idInvFen) {

        return next();

    } else {

        console.log("El investigador que actualiza no es el dueño del fenómeno.");
        getInvestigadorById(idToken).then(result => {

            if (!result.length) {

                return res.status(404).send({ message: "Error 404 - Recurso no encontrado." });

            }

            if (result[0].isAdmin) {

                console.log("Tiene permisos de administrador.");
                return next();

            } else {

                return res.status(401).send({ message: "Error 401 - No tiene autorización para realizar la operación." });
            }

        }, err => {

            console.log("Algo ha ido mal.");
            return next(err);

        });

    }

}

//Compara id del investigador que hace la petición y del idInv del comentario

const compareIdsComentario = (req, res, next) => {

    console.log("Validando que el comentario sea de su investigador... ");

    const idToken = req.decoded.sub;

    const idInvCom = req.query.comIdInv || req.comentario.investigadorId;

    if (idToken == idInvCom) {

        return next();

    } else {

        getInvestigadorById(idToken).then(result => {

            if (!result.length) {

                return res.status(404).send({ message: "Error 404 - Recurso no encontrado." });

            }

            if (result[0].isAdmin) {

                return next();

            } else {

                return res.status(401).send({ message: "Error 401 - No tiene autorización para realizar la operación." });
            }

        }, err => {

            console.log("Algo ha ido mal.");
            return next(err);

        });

    }

}

module.exports = { validFenomeno, validComentario, compareIdsFen, compareIdsComentario }