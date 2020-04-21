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
            return res.status(400).send();
            
        }

    }

    return res.status(400).send();
}

const compareIds = (req, res, next) => {
    
    console.log("Validando que el fenómeno sea de su investigador... ");

    let idToken = req.decoded.sub;
    let idFen = req.fenomeno.investigadorId;

    if(idToken == idFen){

        return next();

    } else {

        return res.status(401).send();

    }

}

module.exports = { validFenomeno, compareIds }