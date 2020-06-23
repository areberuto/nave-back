const { con } = require('./mysql');

//Drop, create, insert queries.

const dropCategorias = () => new Promise(function(resolve, reject) {

    const sql = "DROP TABLE IF EXISTS categorias";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const createCategorias = () => new Promise(function(resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS categorias (id TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT, categoria VARCHAR(20) NOT NULL)";

    con.query(sql, function(err, result, fields) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve("Fields:", fields);

        }

    });
});

const seedCategorias = () => new Promise(function(resolve, reject) {

    const sql = "INSERT INTO categorias (categoria) VALUES ('Sin categoría'), ('Ufología'), ('Psicofonías'), ('Fantasmas');";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const dropCodigos = () => new Promise(function(resolve, reject) {

    const sql = "DROP TABLE IF EXISTS codigos_activacion";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const createCodigos = () => new Promise(function(resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS codigos_activacion (id MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT, idInv MEDIUMINT NOT NULL, email VARCHAR(50) NOT NULL, codigo VARCHAR(50) NOT NULL, FOREIGN KEY(idInv) REFERENCES investigadores(id))";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const dropInvestigadores = () => new Promise(function(resolve, reject) {

    const sql = "DROP TABLE IF EXISTS investigadores";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const createInvestigadores = () => new Promise(function(resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS investigadores (id MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT, correo VARCHAR(50) NOT NULL, clave VARCHAR(80) NOT NULL, nombre VARCHAR(20) NOT NULL, apellido1 VARCHAR(20) NOT NULL, apellido2 VARCHAR(20) NOT NULL, organismo VARCHAR(50) NOT NULL, genero ENUM ('hombre', 'mujer') NOT NULL, ciudad VARCHAR(40) NOT NULL, pais VARCHAR(40) NOT NULL, fechaNacimiento DATE NOT NULL, verificado TINYINT(1) DEFAULT 0 NOT NULL, isAdmin TINYINT(1) DEFAULT 0 NOT NULL)";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const seedInvestigadores = () => new Promise(function(resolve, reject) {

    const sql = "INSERT INTO investigadores (correo, clave, nombre, apellido1, apellido2, organismo, genero, ciudad, pais,fechaNacimiento, verificado, isAdmin) VALUES ('areberuto.dev@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Areberuto', 'Foo', 'Bar', 'Universidad de Sevilla', 'hombre', 'Sevilla', 'España', '1993-09-04', 1, 1), ('ausonia@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Sonia Aurelia', 'Márquez', 'Rovira', 'Universidad de Valencia', 'mujer', 'Valencia', 'España','1990-12-02', 1, 0), ('carlosruiman@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Carlos', 'Ruíz', 'Manila', 'Universidad de Barcelona', 'hombre', 'Barcelona', 'España','1970-11-30', 1, 0)";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

const dropComentarios = () => new Promise(function(resolve, reject) {

    const sql = "DROP TABLE IF EXISTS comentarios";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const createComentarios = () => new Promise(function(resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS comentarios (id MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT, investigadorId MEDIUMINT NOT NULL, fenomenoId MEDIUMINT NOT NULL, fecha DATETIME NOT NULL, comentario VARCHAR(1000) NOT NULL, FOREIGN KEY(investigadorId) REFERENCES investigadores(id), FOREIGN KEY(fenomenoId) REFERENCES fenomenos(id))";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const seedComentarios = () => new Promise(function(resolve, reject) {

    const sql = "INSERT INTO comentarios (investigadorId, fenomenoId, fecha, comentario) VALUES (2, 1, '2020-04-13 22:04:58', 'Wow, me ha impresionado este suceso. Le seguiré la pista. ¡Gracias!'), (1, 1, '2020-04-14 11:45:03', 'Gracias a ti por seguir mis investigaciones, Sonia. Un saludo.'), (3, 2, '2020-05-20 12:15:20', 'Sonia, te he escrito a tu correo. Creo que tengo información que te puede interesar. Contéstame tan pronto como puedas')";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});


const dropFenomenos = () => new Promise(function(resolve, reject) {

    const sql = "DROP TABLE IF EXISTS fenomenos";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const createFenomenos = () => new Promise(function(resolve, reject) {

    const sql = "CREATE TABLE IF NOT EXISTS fenomenos (id MEDIUMINT NOT NULL PRIMARY KEY AUTO_INCREMENT, investigadorId MEDIUMINT NOT NULL, titulo VARCHAR(100) NOT NULL, descripcionCorta VARCHAR(400) NOT NULL, contenido VARCHAR(3000) NOT NULL, fecha DATE NOT NULL, publicado DATE NOT NULL, ciudad VARCHAR(40) NOT NULL, pais VARCHAR(40) NOT NULL, latitud FLOAT(8, 6) NOT NULL, longitud FLOAT(9, 6) NOT NULL, categoria TINYINT, aprobado TINYINT(1) DEFAULT 0, FOREIGN KEY(investigadorId) REFERENCES investigadores(id), FOREIGN KEY(categoria) REFERENCES categorias(id))";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });

});

const seedFenomenos = () => new Promise(function(resolve, reject) {

    const sql = "INSERT INTO fenomenos (investigadorId, titulo, descripcionCorta, contenido, fecha, publicado, ciudad, pais, latitud, longitud, categoria, aprobado) VALUES (1, 'Gritos en la Mezquita de Córdoba.', 'Escalofriantes gritos de socorro escuchados, periodicamente, en el verano de 2004 en la famosa mezquita andaluza. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor tellus, tempus non hendrerit eu, dapibus id mi. Aliquam erat volutpat. Fusce ultricies augue ac dignissim faucibus. Curabitur consectetur quis arcu blandit tristique. Vestibulum ante nibh, dignissim sit amet sapien quis, posuere blandit enim. Vivamus mollis purus eu mauris placerat cursus. Ut consectetur, libero eget pulvinar sagittis, purus sem tincidunt lacus, in aliquet justo ligula et nunc. In sit amet venenatis erat. Etiam luctus velit non lacinia placerat. Suspendisse suscipit elementum justo nec dignissim. Nulla ullamcorper ex eu ligula vestibulum, a elementum quam faucibus. Vestibulum tincidunt urna nec orci feugiat lobortis. Aenean ullamcorper, est quis ornare mollis, elit nisl tempus sapien, et consectetur felis nisi nec libero. Ut aliquam ante non suscipit euismod. Proin accumsan at tellus at rhoncus.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.','2004-04-01', '2020-05-15', 'Córdoba','España', 37.878982, -4.779677, 1, 1), (2, 'Misteriosas apariciones estelares sobre la Ciudad de la Ciencia', 'Testimonios de vecinos colindantes a la institución granadina reportan visualizar artefactos voladores sobre dicho edificio.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor tellus, tempus non hendrerit eu, dapibus id mi. Aliquam erat volutpat. Fusce ultricies augue ac dignissim faucibus. Curabitur consectetur quis arcu blandit tristique. Vestibulum ante nibh, dignissim sit amet sapien quis, posuere blandit enim. Vivamus mollis purus eu mauris placerat cursus. Ut consectetur, libero eget pulvinar sagittis, purus sem tincidunt lacus, in aliquet justo ligula et nunc. In sit amet venenatis erat. Etiam luctus velit non lacinia placerat. Suspendisse suscipit elementum justo nec dignissim. Nulla ullamcorper ex eu ligula vestibulum, a elementum quam faucibus. Vestibulum tincidunt urna nec orci feugiat lobortis. Aenean ullamcorper, est quis ornare mollis, elit nisl tempus sapien, et consectetur felis nisi nec libero. Ut aliquam ante non suscipit euismod. Proin accumsan at tellus at rhoncus.', 'Dichas personas han reportado el avistamiento de objetos metálicos que emitían luces azul pálido sobrevolar el edificio cada lunes, durante dos semanas, a las doce de la ncohe. Escalofriante, horropilante, fantastartico cuanto menos. Un fenómeno digno de lorem ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.', '2018-11-25', '2020-06-02', 'Granada', 'España', 37.162177, -3.606841, 2, 1), (1, 'El pan que hablaba', 'En el mercado de Sant Cougat, un misterioso mercader porta un pan que habla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor tellus, tempus non hendrerit eu, dapibus id mi. Aliquam erat volutpat. Fusce ultricies augue ac dignissim faucibus. Curabitur consectetur quis arcu blandit tristique. Vestibulum ante nibh, dignissim sit amet sapien quis, posuere blandit enim. Vivamus mollis purus eu mauris placerat cursus. Ut consectetur, libero eget pulvinar sagittis, purus sem tincidunt lacus, in aliquet justo ligula et nunc. In sit amet venenatis erat. Etiam luctus velit non lacinia placerat. Suspendisse suscipit elementum justo nec dignissim. Nulla ullamcorper ex eu ligula vestibulum, a elementum quam faucibus. Vestibulum tincidunt urna nec orci feugiat lobortis. Aenean ullamcorper, est quis ornare mollis, elit nisl tempus sapien, et consectetur felis nisi nec libero. Ut aliquam ante non suscipit euismod. Proin accumsan at tellus at rhoncus.', 'A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. \"Acérquense,\" decía, \"y toquen el pan: ¿cómo está\", preguntaba. \"Está blando, contestaba\". Impresionante. A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. \"Acérquense,\" decía, \"y toquen el pan: ¿cómo está\", preguntaba. \"Está blando, contestaba\". Impresionante. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.', '2017-12-29', '2020-02-09', 'Barcelona', 'España', 41.473080, 2.081366, 3, 1), (3, 'Investigadores de la policía forense de Madrid encuentran cadáver animal con dos cabezas.', 'Al llegar a la escena del crimen, los investigadores no daban crédito a lo que veían. El cuerpo sin vida de un perro adulto presentaba dos cabezas, y, libero eget pulvinar sagittis, purus sem tincidunt lacus, in aliquet justo ligula et nunc. In sit amet venenatis erat. Etiam luctus velit non lacinia placerat. Suspendisse suscipit elementum justo nec dignissim. Nulla ullamcorper ex eu ligula vestibulum, a elementum quam faucibus. Vestibulum tincidunt urna nec orci feugiat lobortis. Aenean ullamcorper, est quis ornare mollis, elit nisl tempus sapien, et consectetur felis nisi nec libero. Ut aliquam ante non suscipit euismod. Proin accumsan at tellus at rhoncus.', 'Escalofriante, horropilante, fantastartico cuanto menos. Un fenómeno digno de lorem ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.', '2019-02-14', '2020-06-09', 'Madrid', 'España', 40.427793, -3.749819, 1, 0)";

    con.query(sql, function(err, result) {

        if (err) {

            reject(new Error(err));

        } else {

            resolve(result);

        }

    });
});

//Full drops, creates, and inserts queries

const dropTables = () => {

    return dropComentarios().then(() => {

        console.log("Drop comentarios - OK");
        return dropFenomenos();

    }).then(() => {

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
        return createInvestigadores();

    }).then(() => {

        console.log("Create investigadores - OK");
        return createCodigos();

    }).then(() => {

        console.log("Create códigos_activación - OK");
        return createFenomenos();

    }).then(() => {

        console.log("Create fenómenos - OK");
        return createComentarios();

    }).then(() => {

        console.log("Create comentarios - OK");
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
        return seedComentarios();

    }).then(() => {

        console.log("Seed comentarios - OK");
        return new Promise(resolve => resolve("ALL SEEDS - OK"));

    }).catch(err => {

        console.log("Algo ha ido mal:", err);

    });

}

//GET

const getFenomenos = (queryParams) => {

    let sql = "SELECT f.*, i.nombre as nombreInvestigador, i.apellido1 as apellidoInv1, i.apellido2 as apellidoInv2, c.categoria, c.id as categoriaId FROM fenomenos as f INNER JOIN investigadores as i ON f.investigadorId = i.id INNER JOIN categorias as c ON f.categoria = c.id WHERE f.aprobado = 1";

    let values = [];

    //Only add search if user requests it - Sólo se añade la parte de búsqueda si el usuario lo pide.

    if (Object.keys(queryParams).length != 0) {

        let idInvSql = "",
            ciudadSql = "",
            categoriaSql = "",
            paisSql = "",
            fechaInicioSql = "",
            fechaFinSql = "",
            textoSql = "",
            idFenSql = "",
            publicadoInicioSql = "",
            publicadoFinSql = "";

        if (queryParams.idInv) {

            idInvSql = " AND f.investigadorId = ?";
            sql += idInvSql;
            values.push(queryParams.idInv);

        }

        if (queryParams.ciudad) {

            ciudadSql = "f.ciudad LIKE ?";
            sql += ` AND ${ciudadSql}`;

            values.push(`%${queryParams.ciudad}%`);

        }

        if (queryParams.pais) {

            paisSql = "f.pais LIKE ?";
            sql += ` AND ${paisSql}`;

            values.push(`%${queryParams.pais}%`);

        }

        if (queryParams.categoria) {

            categoriaSql = "c.id = ?";
            sql += ` AND ${categoriaSql}`;

            values.push(queryParams.categoria);

        }

        if (queryParams.texto) {

            textoSql = "((f.titulo LIKE ?) OR (f.descripcionCorta LIKE ?) OR (f.contenido LIKE ?))"
            sql += ` AND ${textoSql}`;

            for (let i = 0; i < 3; i++) {

                values.push(`%${queryParams.texto}%`);

            }

        }

        if (queryParams.fechaInicio) {

            fechaInicioSql = `f.fecha >= ?`;
            sql += ` AND ${fechaInicioSql}`;

            values.push(queryParams.fechaInicio);

        }

        if (queryParams.fechaFin) {

            fechaFinSql = `f.fecha <= ?`;
            sql += ` AND ${fechaFinSql}`;

            values.push(queryParams.fechaFin);

        }

        if (queryParams.publicadoInicio) {

            publicadoInicioSql = `f.publicado >= ?`;
            sql += ` AND ${publicadoInicioSql}`;

            values.push(queryParams.publicadoInicio);

        }

        if (queryParams.publicadoFin) {

            publicadoFinSql = `f.publicado <= ?`;
            sql += ` AND ${publicadoFinSql}`;

            values.push(queryParams.publicadoFin);

        }

        if (queryParams.idFen) {

            idFenSql = `f.id = ?`;
            sql += ` AND ${idFenSql}`;

            values.push(queryParams.idFen);

        }

    }

    sql += " ORDER BY PUBLICADO DESC";

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

//Since only admin can see pending phenomena, we use a separate querie.
//Puesto que solo el admin puede ver los fenómenos pendientes de moderar, usamos una querie aparte.

const getFenomenosModerar = (idFen = undefined) => {

    let sql = "SELECT f.*, i.nombre as nombreInvestigador, i.apellido1 as apellidoInv1, i.apellido2 as apellidoInv2, c.categoria, c.id as categoriaId FROM fenomenos as f INNER JOIN investigadores as i ON f.investigadorId = i.id INNER JOIN categorias as c ON f.categoria = c.id WHERE f.aprobado = 0";

    let values = [];

    if (idFen) {

        sql += ` AND f.id = ?`
        values.push(idFen);

    }

    sql += " ORDER BY FECHA ASC";

    console.log("idFen", idFen);
    console.log("sql", sql);

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const getComentarios = (idFen) => {

    const values = [idFen];

    const sql = "SELECT c.*, i.nombre, i.apellido1 FROM comentarios AS c INNER JOIN investigadores AS i ON c.investigadorId = i.id WHERE c.fenomenoId = ? ORDER BY c.ID ASC";

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const getCategorias = () => {

    return new Promise(function(resolve, reject) {

        const sql = "SELECT * FROM categorias";
        con.query(sql, function(err, result) {

            if (err) {

                reject(err);

            }

            resolve(result);

        });

    });

}

const getInvestigadores = () => {

    const sql = `SELECT * FROM investigadores`;

    return new Promise(function(resolve, reject) {

        con.query(sql, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

}

const getInvestigadorByEmail = email => {

    const values = [email];
    const sql = `SELECT * FROM investigadores WHERE correo = ?`;

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

}

const getInvestigadorById = id => {

    const values = [id];
    const sql = `SELECT * FROM investigadores WHERE id = ?`;

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

}

const getClaveInvestigador = (idInv) => {

    const values = [idInv];
    const sql = `SELECT clave FROM investigadores WHERE ID = ?`;

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

}

const getCodgenInfo = codGen => {

    const sql = `SELECT * FROM codigos_activacion WHERE codigo = ?`;
    const values = [codGen];

    return new Promise((resolve, reject) => {

        con.query(sql, values, (err, result) => {

            if (err) {

                reject(err);

            }

            resolve(result, codGen);

        });

    });

}

const isValidRefresh = (correo) => {

    const values = [correo];
    const sql = `SELECT * FROM investigadores WHERE correo = ?`;

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

}

//POST

const postComentario = (comentario) => {

    const anio = new Date().getFullYear();
    const mes = new Date().getMonth();
    const dia = new Date().getDate();
    const hora = new Date().getHours();
    const minutos = new Date().getMinutes();
    const segundos = new Date().getSeconds();

    const fecha = new Date(anio, mes, dia, hora, minutos, segundos);

    comentario.fecha = fecha;

    const sql = "INSERT INTO comentarios (investigadorId, fenomenoId, fecha, comentario) VALUES (?, ?, ?, ?)";

    const values = [comentario.investigadorId, comentario.fenomenoId, comentario.fecha, comentario.comentario];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const postFenomeno = fenomeno => {

    const anio = new Date().getFullYear();
    const mes = new Date().getMonth();
    const dia = new Date().getDate();
    const hora = new Date().getHours();
    const minutos = new Date().getMinutes();
    const segundos = new Date().getSeconds();

    const fecha = new Date(anio, mes, dia, hora, minutos, segundos);
    fenomeno.publicado = fecha;

    const sql = `INSERT INTO fenomenos (investigadorId, titulo, descripcionCorta, contenido, fecha, publicado, ciudad, pais, categoria, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [fenomeno.investigadorId, fenomeno.titulo, fenomeno.descripcionCorta, fenomeno.contenido, fenomeno.fecha, fenomeno.publicado, fenomeno.ciudad, fenomeno.pais, fenomeno.categoriaId, fenomeno.latitud, fenomeno.longitud];
    
    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const registerInvestigador = (investigador, hash) => {

    const sql = `INSERT INTO investigadores (correo, clave, nombre, apellido1, apellido2, organismo, genero, ciudad, pais, fechaNacimiento, verificado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [investigador.correo, hash, investigador.nombre, investigador.apellido1, investigador.apellido2, investigador.organismo, investigador.genero, investigador.ciudad, investigador.pais, investigador.fechaNacimiento, 0];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            } else {

                resolve(investigador);

            }

        });

    });

}

const addCodigoActivacion = (idInsert, email, codGen) => {

    const sql = `INSERT INTO codigos_activacion (idInv, email, codigo) VALUES (?, ?, ?)`;
    const values = [idInsert, email, codGen];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            }

            resolve({ email, codGen });

        });

    });

}

//PUT

const updateFenomeno = fenomeno => {

    const sql = `UPDATE fenomenos SET categoria = ?, titulo = ?, descripcionCorta = ?, contenido = ?, fecha = ?, ciudad = ?, pais = ?, latitud = ?, longitud = ? WHERE id = ?`;

    const values = [fenomeno.categoriaId, fenomeno.titulo, fenomeno.descripcionCorta, fenomeno.contenido, fenomeno.fecha, fenomeno.ciudad, fenomeno.pais, fenomeno.latitud, fenomeno.longitud, fenomeno.id];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const updateInvestigador = (investigador) => {

    const sql = `UPDATE investigadores SET correo = ?, nombre = ?, apellido1 = ?, apellido2 = ?, organismo = ?, genero = ?, ciudad = ?, pais = ?, fechaNacimiento = ? WHERE id = ?`;

    const values = [investigador.correo, investigador.nombre, investigador.apellido1, investigador.apellido2, investigador.organismo, investigador.genero, investigador.ciudad, investigador.pais, investigador.fechaNacimiento, investigador.id];


    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            } else {

                resolve(result);

            }

        });

    });

}

const updateClave = (hash, idInv) => {

    const sql = `UPDATE INVESTIGADORES SET clave = ? WHERE ID = ?`;
    const values = [hash, idInv];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            } else {

                resolve({ hash, idInv });

            }

        });

    });

}

const aprobarFenomeno = idFen => {

    const sql = `UPDATE fenomenos SET aprobado = 1 WHERE id = ?`;
    const values = [idFen];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const updateVerificacion = (idInv) => {

    const sql = `UPDATE INVESTIGADORES SET verificado = 1 WHERE ID = ?`;
    const values = [idInv];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            }

            resolve(idInv);

        });

    });

}

//DELETE

const deleteFenomeno = id => {

    const sql = `DELETE FROM fenomenos WHERE id = ?`;
    const values = [id];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const deleteFenomenosByInv = idInv => {

    const sql = `DELETE FROM fenomenos WHERE investigadorId  = ?`;
    const values = [idInv];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const deleteComentario = id => {

    const sql = `DELETE FROM comentarios WHERE id = ?`;
    const values = [id];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const deleteInvestigador = idInv => {

    const values = [idInv];

    const sql = `DELETE FROM investigadores WHERE id = ?`;

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(new Error(err));

            } else {

                resolve(result);

            }

        });

    });

};

const deleteCodigoByIdInv = idInv => {

    const sql = `DELETE FROM codigos_activacion WHERE idInv = ?`;
    const values = [idInv];

    return new Promise(function(resolve, reject) {

        con.query(sql, values, function(err, result) {

            if (err) {

                reject(err);

            }

            resolve(result);

        });

    });

}

module.exports = { dropTables, createTables, seedTables, getComentarios, getFenomenos, getFenomenosModerar, getCategorias, postFenomeno, postComentario, aprobarFenomeno, updateFenomeno, deleteFenomeno, deleteFenomenosByInv, deleteComentario, getInvestigadores, getInvestigadorById, getInvestigadorByEmail, getClaveInvestigador, registerInvestigador, updateInvestigador, updateClave, deleteInvestigador, isValidRefresh, getCodgenInfo, addCodigoActivacion, updateVerificacion, deleteCodigoByIdInv }
