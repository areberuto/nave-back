const { db } = require('./sql/sql');

db.serialize(() => {

    db.run("DROP TABLE IF EXISTS categorias", err => {

        if(err){
            console.log(err);
        }

    });

    db.run('CREATE TABLE IF NOT EXISTS categorias ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "categoria" TEXT NOT NULL)', err => {

        if(err){
            console.log(err);
        }

    });

    db.run("DROP TABLE IF EXISTS codigos_activacion", err => {

        if(err){
            console.log(err);
        }

    });

    db.run('CREATE TABLE IF NOT EXISTS codigos_activacion ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "idInv" INTEGER NOT NULL, "email" TEXT NOT NULL, "codigo" TEXT NOT NULL)', err => {

        if(err){
            console.log(err);
        }

    });

    db.run("DROP TABLE IF EXISTS investigadores", err => {

        if(err){
            console.log(err);
        }

    });

    db.run('CREATE TABLE IF NOT EXISTS investigadores ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "correo" TEXT NOT NULL, "clave" TEXT NOT NULL, "nombre" TEXT NOT NULL, "apellido1" TEXT NOT NULL, "apellido2"	TEXT NOT NULL, "organismo" TEXT NOT NULL, "genero" TEXT NOT NULL, "ciudad" TEXT NOT NULL, "pais" TEXT NOT NULL, "fechaNacimiento" TEXT NOT NULL, "verificado" INTEGER DEFAULT 0 NOT NULL)', err => {

        if(err){
            console.log(err);
        }

    });

    db.run("DROP TABLE IF EXISTS fenomenos", err => {

        if(err){
            console.log(err);
        }

    });

    db.run('CREATE TABLE IF NOT EXISTS fenomenos ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "investigadorId" INTEGER NOT NULL, "titulo" TEXT NOT NULL, "descripcionCorta" TEXT NOT NULL, "contenido" TEXT NOT NULL, "fecha" TEXT NOT NULL, "ciudad" TEXT NOT NULL, "pais" TEXT NOT NULL, "latitud" NUMBER, "longitud" NUMBER, "categoria" NUMBER, FOREIGN KEY("investigadorId") REFERENCES investigadores("id"), FOREIGN KEY("categoria") REFERENCES categorias("id"))', err => {

        if(err){
            console.log(err);
        }

    });
    
    db.run(`INSERT INTO investigadores ("correo","clave","nombre","apellido1","apellido2","organismo","genero","ciudad","pais","fechaNacimiento", "verificado") VALUES ('areberuto.dev@gmail.com','$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.','Areberuto','Foo','Bar','Universidad de Sevilla','hombre','Sevilla','España','04-09-1993', 1), ('ausonia@gmail.com','$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Sonia Aurelia', 'Márquez', 'Rovira', 'Universidad de Valencia', 'mujer', 'Valencia', 'España','02-02-1990', 1),
    ('carlosruiman@gmail.com','$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Carlos', 'Ruíz', 'Manila', 'Universidad de Barcelona', 'hombre', 'Barcelona', 'España','30-11-1970', 1);`, function(err){

        if(err){
            console.log(err);
        } else {
            console.log('DATOS INSERTADOS EN investigadores:', this.changes);
        }
    });

    db.run(`INSERT INTO categorias ("categoria") VALUES ('Ufología'), ('Psicofonías'), ('Fantasmas');`, function(err){

        if(err){
            console.log(err);
        } else {
            console.log('DATOS INSERTADOS EN categorias:', this.changes);
        }

    });

    db.run(`INSERT INTO fenomenos ("investigadorId","titulo","descripcionCorta","contenido","fecha","ciudad","pais","latitud","longitud","categoria") VALUES (1, 'Gritos en la Mezquita de Córdoba.', 'Escalofriantes gritos de socorro escuchados, periodicamente, en el verano de 2004 en la famosa mezquita andaluza.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis.
    Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? .','2004-04-01','Córdoba','España', 37.878982, -4.779677, 1), (2, 'Misteriosas apariciones estelares sobre la Ciudad de la Ciencia', 'Testimonios de vecinos colindantes a la institución granadina reportan visualizar artefactos voladores sobre dicho edificio.', 'Dichas personas han reportado el avistamiento de objetos metálicos que emitían luces azul pálido sobrevolar el edificio cada lunes, durante dos semanas, a las doce de la ncohe. Escalofriante, horropilante, fantastartico cuanto menos. Un fenómeno digno de lorem ipsum.', '2018-11-25', 'Granada', 'España', 37.162177, -3.606841, 2),
    (1, 'El pan que hablaba', 'En el mercado de Sant Cougat, un misterioso mercader porta un pan que habla', 'A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. "Acérquense," decía, "y toquen el pan: ¿cómo está", preguntaba. "Está blando, contestaba". Impresionante. A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. "Acérquense," decía, "y toquen el pan: ¿cómo está", preguntaba. "Está blando, contestaba". Impresionante.', '2017-12-29', 'Barcelona', 'España', 41.473080, 2.081366, 3);`, function(err){

        if(err){
            console.log(err);
        } else {
            console.log('DATOS INSERTADOS EN fenomenos:', this.changes);
        }

    });

});