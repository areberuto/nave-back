const { getInvestigadorById } = require('../sql/queries');

//Validación de los datos requeridos del fenómeno

const validFenomeno = (req, res, next) => {
    
    console.log("Validando datos del fenómeno... ");

    if (req.body.fenomeno) {

        let fenomeno = req.body.fenomeno;

        let isInvalid = (!fenomeno.investigadorId || !fenomeno.titulo || !fenomeno.descripcionCorta || !fenomeno.contenido || !fenomeno.latitud || !fenomeno.longitud || !fenomeno.fecha || !fenomeno.ciudad || !fenomeno.pais);

        if (!isInvalid) {

            console.log("Fenómeno válido.");
            req.fenomeno = fenomeno;
            return next();

        } else {

            console.log("Fenómeno inválido.");
            return res.status(400).send({message: "Error 400 - Datos del fenómeno inválidos."});
            
        }

    }

    return res.status(400).send({message: "Error 400 - Datos del fenómeno no proporcionados."});
}

const compareIds = (req, res, next) => {
    
    console.log("Validando que el fenómeno sea de su investigador... ");

    console.log(req.decoded);

    let idToken = req.decoded.sub;
    let idInvFen = req.fenomeno.investigadorId;

    if(idToken == idInvFen){

        return next();

    } else {

        console.log("El investigador que actualiza no es el dueño del fenómeno.");
        getInvestigadorById(idToken).then(result => {

            if(!result.length){

                return res.status(404).send({message: "Error 404 - Recurso no encontrado."});

            }

            if(result[0].isAdmin){

                return next();

            } else {

                return res.status(401).send({message: "Error 401 - No tiene autorización para realizar la operación."});
            }

        }, err => {

            console.log("Algo ha ido mal.");
            return next(err);

        });

    }

}

module.exports = { validFenomeno, compareIds }