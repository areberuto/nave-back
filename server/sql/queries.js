const { con } = require('./mysql');

//Drops, creates, inserts para el arranque

const dropCategorias = () => new Promise(function (resolve, reject) {

    const sql = "DROP TABLE IF EXISTS categorias";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const createCategorias = () => new Promise(function (resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS categorias (id TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT, categoria VARCHAR(20) NOT NULL)";

    con.query(sql, function (err, result, fields) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve("Fields:", fields);

        }

    });
});

const seedCategorias = () => new Promise(function (resolve, reject) {

    const sql = "INSERT INTO categorias (categoria) VALUES ('Sin categoría'), ('Ufología'), ('Psicofonías'), ('Fantasmas');";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const dropCodigos = () => new Promise(function (resolve, reject) {

    const sql = "DROP TABLE IF EXISTS codigos_activacion";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const createCodigos = () => new Promise(function (resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS codigos_activacion (id MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT, idInv SMALLINT NOT NULL, email VARCHAR(50) NOT NULL, codigo VARCHAR(50) NOT NULL)";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const dropInvestigadores = () => new Promise(function(resolve, reject) {

    const sql = "DROP TABLE IF EXISTS investigadores";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const createInvestigadores = () => new Promise(function(resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS investigadores (id MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT, correo VARCHAR(50) NOT NULL, clave VARCHAR(80) NOT NULL, nombre VARCHAR(20) NOT NULL, apellido1 VARCHAR(20) NOT NULL, apellido2 VARCHAR(20) NOT NULL, organismo VARCHAR(50) NOT NULL, genero ENUM ('hombre', 'mujer') NOT NULL, ciudad VARCHAR(40) NOT NULL, pais VARCHAR(40) NOT NULL, fechaNacimiento DATE NOT NULL, verificado TINYINT(1) DEFAULT 0 NOT NULL, isAdmin TINYINT(1) DEFAULT 0 NOT NULL)";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const seedInvestigadores = () => new Promise(function(resolve, reject) {

    const sql = "INSERT INTO investigadores (correo, clave, nombre, apellido1, apellido2, organismo, genero, ciudad, pais,fechaNacimiento, verificado, isAdmin) VALUES ('areberuto.dev@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Areberuto', 'Foo', 'Bar', 'Universidad de Sevilla', 'hombre', 'Sevilla', 'España', '1993-09-04', 1, 1), ('ausonia@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Sonia Aurelia', 'Márquez', 'Rovira', 'Universidad de Valencia', 'mujer', 'Valencia', 'España','1990-12-02', 1, 0), ('carlosruiman@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Carlos', 'Ruíz', 'Manila', 'Universidad de Barcelona', 'hombre', 'Barcelona', 'España','1970-11-30', 1, 0)";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const dropFenomenos = () => new Promise(function(resolve, reject) {

    const sql = "DROP TABLE IF EXISTS fenomenos";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const createFenomenos = () => new Promise(function(resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS fenomenos (id MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT, investigadorId MEDIUMINT NOT NULL, titulo VARCHAR(100) NOT NULL, descripcionCorta VARCHAR(300) NOT NULL, contenido VARCHAR(2000) NOT NULL, fecha DATE NOT NULL, ciudad VARCHAR(40) NOT NULL, pais VARCHAR(40) NOT NULL, latitud FLOAT(8, 6) NOT NULL, longitud FLOAT(9, 6) NOT NULL, categoria TINYINT, FOREIGN KEY(investigadorId) REFERENCES investigadores(id), FOREIGN KEY(categoria) REFERENCES categorias(id))";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const seedFenomenos = () => new Promise(function(resolve, reject) {

    const sql = "INSERT INTO fenomenos (investigadorId, titulo, descripcionCorta, contenido, fecha, ciudad, pais, latitud, longitud, categoria) VALUES (1, 'Gritos en la Mezquita de Córdoba.', 'Escalofriantes gritos de socorro escuchados, periodicamente, en el verano de 2004 en la famosa mezquita andaluza.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? .','2004-04-01','Córdoba','España', 37.878982, -4.779677, 1), (2, 'Misteriosas apariciones estelares sobre la Ciudad de la Ciencia', 'Testimonios de vecinos colindantes a la institución granadina reportan visualizar artefactos voladores sobre dicho edificio.', 'Dichas personas han reportado el avistamiento de objetos metálicos que emitían luces azul pálido sobrevolar el edificio cada lunes, durante dos semanas, a las doce de la ncohe. Escalofriante, horropilante, fantastartico cuanto menos. Un fenómeno digno de lorem ipsum.', '2018-11-25', 'Granada', 'España', 37.162177, -3.606841, 2), (1, 'El pan que hablaba', 'En el mercado de Sant Cougat, un misterioso mercader porta un pan que habla', 'A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. \"Acérquense,\" decía, \"y toquen el pan: ¿cómo está\", preguntaba. \"Está blando, contestaba\". Impresionante. A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. \"Acérquense,\" decía, \"y toquen el pan: ¿cómo está\", preguntaba. \"Está blando, contestaba\". Impresionante.', '2017-12-29', 'Barcelona', 'España', 41.473080, 2.081366, 3)";

    con.query(sql, function (err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const dropTables = () => {

    return dropFenomenos().then(() => {

        console.log("Drop fenómenos - OK");
        return dropCategorias();

    }).then(() => {

        console.log("Drop categorías - OK");
        return dropCodigos();
        
    }).then(() => {

        console.log("Drop códigos_activación - OK");
        return dropInvestigadores();
        
    }).then(() => {
       
        console.log("Drop investigadores - OK");
        return new Promise(resolve => resolve("ALL DROPS - OK"));

    }).catch(err => {

        console.log("Algo ha ido mal:", err);

    });

}

const createTables = () => {

    return createCategorias().then(() => {

        console.log("Create categorías - OK");
        return createCodigos();

    }).then(() => {

        console.log("Create códigos_activación - OK");
        return createInvestigadores();
        
    }).then(() => {

        console.log("Create investigadores - OK");
        return createFenomenos();
        
    }).then(() => {
       
        console.log("Create fenómenos - OK");
        return new Promise(resolve => resolve("ALL CREATES - OK"));

    }).catch(err => {

        console.log("Algo ha ido mal:", err);

    });

}

const seedTables = () => {

    return seedCategorias().then(() => {

        console.log("Seed categorías - OK");
        return seedInvestigadores();

    }).then(() => {

        console.log("Seed investigadores - OK");
        return seedFenomenos();
        
    }).then(() => {
       
        console.log("Seed fenómenos - OK");
        return new Promise(resolve => resolve("ALL SEEDS - OK"));

    }).catch(err => {

        console.log("Algo ha ido mal:", err);

    });

}

//Fenomenos

const getFenomenos = (sql) => {

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

};

const getCategorias = () => {

    return new Promise(function(resolve, reject){

        const sql = "SELECT * FROM categorias";
        con.query(sql, function(err, result){

            if(err){

                reject(err);

            }

            resolve(result);

        });

    });

}

const postFenomeno = fenomeno => {

    const sql = `INSERT INTO fenomenos (investigadorId, titulo, descripcionCorta, contenido, fecha, ciudad, pais, latitud, longitud) VALUES (${fenomeno.investigadorId}, '${fenomeno.titulo}', '${fenomeno.descripcionCorta}', '${fenomeno.contenido}', '${fenomeno.fecha}', '${fenomeno.ciudad}', '${fenomeno.pais}', '${fenomeno.latitud}', '${fenomeno.longitud}')`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

};

const updateFenomeno = sql => {

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

};

const deleteFenomeno = id => {

    const sql = `DELETE FROM fenomenos WHERE id = ${id}`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

};

const deleteFenomenosByInv = idInv => {

    const sql = `DELETE FROM fenomenos WHERE investigadorId  = ${idInv}`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

};

//Investigadores

const getInvestigadores = () => {

    const sql = `SELECT * FROM investigadores`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
                
                resolve(result);
    
            }
    
        });

    });

}

const getInvestigadorByEmail = email => {

    const sql = `SELECT * FROM investigadores WHERE correo = '${email}'`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

}

const getInvestigadorById = id => {

    const sql = `SELECT * FROM investigadores WHERE id = ${id}`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

}

const getClaveInvestigador = (idInv) => {

    return new Promise(function(resolve, reject){

        const sql = `SELECT clave FROM investigadores WHERE ID = ${idInv}`;
        con.query(sql, function(err, result){

            if(err){

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

}

const registerInvestigador = (investigador, hash) => {

    const sql = `INSERT INTO investigadores (correo, clave, nombre, apellido1, apellido2, organismo, genero, ciudad, pais, fechaNacimiento, verificado) VALUES ('${investigador.correo}', '${hash}', '${investigador.nombre}', '${investigador.apellido1}', '${investigador.apellido2}', '${investigador.organismo}', ${investigador.genero}, '${investigador.ciudad}','${investigador.pais}', '${investigador.fechaNacimiento}', 0)`;

    return new Promise(function(resolve, reject){

        con.query(sql, function(err, result){

            if(err){

                reject(err);

            } else {

                resolve(investigador);

            }

        });

    });

}

const updateInvestigador = (investigador) => {

    return new Promise(function(resolve, reject){

        const sql = `UPDATE investigadores SET correo = '${investigador.correo}', nombre = '${investigador.nombre}', apellido1 = '${investigador.apellido1}', apellido2 = '${investigador.apellido2}', organismo = '${investigador.organismo}', genero = ${investigador.genero}, ciudad = '${investigador.ciudad}', pais = '${investigador.pais}', fechaNacimiento = '${investigador.fechaNacimiento}' WHERE id = ${investigador.id}`;

        con.query(sql, function(err, result){

            if(err){

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

}

const updateClave = (hash, idInv) => {

    return new Promise(function(resolve, reject){

        const sql = `UPDATE INVESTIGADORES SET clave = '${hash}' WHERE ID = ${idInv}`;

        con.query(sql, function(err, result){

            if(err){

                reject(err);

            } else {

                resolve({hash, idInv});

            }

        });

    });

}

const deleteInvestigador = idInv => {

    const sql = `DELETE FROM investigadores WHERE id = ${idInv}`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function (err, result) {

            if (err) {
    
                reject(new Error(err));
    
            } else {
    
                resolve(result);
    
            }
    
        });

    });

};

//Middleware queries

 //MySQLear this!
 
 const isValidRefresh = (correo) => {

    return new Promise(function(resolve, reject){

        const sql = `SELECT * FROM investigadores WHERE correo = '${correo}'`;

        con.query(sql, function(err, result){

            if(err){

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

}

const getCodgenInfo = codGen => {

    const sql = `SELECT * FROM codigos_activacion WHERE codigo = '${codGen}'`;

    return new Promise((resolve, reject) => {

        con.query(sql, (err, result) => {

            if(err){

                reject(err);

            }

            resolve(result, codGen);

        });

    });

}

const addCodigoActivacion = (idInsert, email, codGen) => {

    const sql = `INSERT INTO codigos_activacion (idInv, email, codigo) VALUES (${idInsert}, '${email}', '${codGen}')`;
    
    return new Promise(function(resolve, reject){

        con.query(sql, function(err, result){

            if(err){

                reject(err);

            }
            
            resolve({email, codGen});

        });

    });
    
}

const updateVerificacion = (idInv) => {

    return new Promise(function(resolve, reject){

        let sql = `UPDATE INVESTIGADORES SET verificado = 1 WHERE ID = ${idInv}`;

        con.query(sql, function(err, result){

            if(err){

                reject(err);

            }

            resolve(idInv);

        });

    });

}

const deleteCodigoByIdInv = idInv => {

    const sql = `DELETE FROM codigos_activacion WHERE idInv = ${idInv}`;

    return new Promise(function(resolve, reject){

        con.query(sql, function(err, result){

            if(err){

                reject(err);

            }

            resolve(result);

        });

    });

}

module.exports = { dropTables, createTables, seedTables, getFenomenos, getCategorias, postFenomeno, updateFenomeno, deleteFenomeno, deleteFenomenosByInv, getInvestigadores, getInvestigadorById, getInvestigadorByEmail, getClaveInvestigador, registerInvestigador, updateInvestigador, updateClave, deleteInvestigador, isValidRefresh, getCodgenInfo, addCodigoActivacion, updateVerificacion, deleteCodigoByIdInv }