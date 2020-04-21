const { db } = require('../sql/sql');

//GET

const checkIfInvExists = (req, res, next) => {

    const idInv = req.query.idInv;
    
    db.get(`SELECT * FROM INVESTIGADORES WHERE id = ${idInv}`, (err, row) => {

        if(err){
            
            console.log(err);
            return next(err);
            
        } else {

            if(!row){

                return res.status(404).send();

            }

            req.idInv = req.query.idInv;
            
            return next();
            
        }

    });

}

module.exports = {checkIfInvExists};