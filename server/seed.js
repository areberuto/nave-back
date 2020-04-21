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

    db.run("DROP TABLE IF EXISTS investigadores", err => {

        if(err){
            console.log(err);
        }

    });

    db.run('CREATE TABLE IF NOT EXISTS investigadores ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "correo" TEXT NOT NULL, "clave" TEXT NOT NULL, "nombre" TEXT NOT NULL, "apellido1" TEXT NOT NULL, "apellido2"	TEXT NOT NULL, "organismo" TEXT NOT NULL, "genero" TEXT NOT NULL, "ciudad" TEXT NOT NULL, "pais" TEXT NOT NULL, "fechaNacimiento" TEXT NOT NULL)', err => {

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
    
    db.run(`INSERT INTO investigadores ("correo","clave","nombre","apellido1","apellido2","organismo","genero","ciudad","pais","fechaNacimiento") VALUES ('areberuto@gmail.com','$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.','Arberto','Pereinado','Rubioro','Universidad de Sevilla','hombre','Sevilla','España','04-09-1993'), ('ausonia@gmail.com','$2a$10$iqxuHckIt9JaiqLTF3I8pOnpZbskHTotZvF.3UCCOpRrIR85j41uW', 'Sonia Aurelia', 'Márquez', 'Rovira', 'Universidad de Valencia', 'mujer', 'Valencia', 'España','02-02-1990'),
    ('carlosruiman@gmail.com','$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Carlos', 'Ruíz', 'Manila', 'Universidad de Barcelona', 'hombre', 'Barcelona', 'España','30-11-1970');`, function(err){

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

    db.run(`INSERT INTO fenomenos ("investigadorId","titulo","descripcionCorta","contenido","fecha","ciudad","pais","latitud","longitud","categoria") VALUES (1, 'El de las aceitunas abre a su hora hulio.', 'Increíble increíble El de las aceitunas abre a su hora. Increíble increíble El de las aceitunas abre a su hora.', 'Increíble increíble El de las aceitunas abre a su hora. Increíble increíble El de las aceitunas abre a su hora.Increíble increíble El de las aceitunas abre a su hora. Increíble increíble El de las aceitunas abre a su hora.Increíble increíble El de las aceitunas abre a su hora. Increíble increíble El de las aceitunas abre a su hora.Increíble increíble El de las aceitunas abre a su hora. Increíble increíble El de las aceitunas abre a su hora.','2015-04-01','Triana','España', NULL, NULL,1), (2, 'Misterios en la Ciutat de la Sensia', 'En la ciudad de la ciencia pasaron cosas muy raras unos sonidos tio jarri pordio hulio ueueuewaawawioaiaoiwoaiwoi.', 'En la ciudad de la ciencia pasaron cosas muy raras unos sonidos tio jarri pordio hulio ueueuewaawawioaiaoiwoaiwoi. En la ciudad de la ciencia pasaron cosas muy raras unos sonidos tio jarri pordio hulio ueueuewaawawioaiaoiwoaiwoi. En la ciudad de la ciencia pasaron cosas muy raras unos sonidos tio jarri pordio hulio ueueuewaawawioaiaoiwoaiwoi.', '2018-11-25', 'Valencia', 'España', NULL, NULL, 2),
    (1, 'La calabaza que estaba to wena.', 'En el mercado de Valencia tio una calabaza hecha al horno de leña ou mama paranormal a tope el sabor.', 'En el mercado de Valencia tio una calabaza hecha al horno de leña ou mama paranormal a tope el sabor.
   En el mercado de Valencia tio una calabaza hecha al horno de leña ou mama paranormal a tope el sabor.
   En el mercado de Valencia tio una calabaza hecha al horno de leña ou mama paranormal a tope el sabor.', '2020-12-31', 'Valencia', 'España', NULL, NULL, 3);`, function(err){

        if(err){
            console.log(err);
        } else {
            console.log('DATOS INSERTADOS EN fenomenos:', this.changes);
        }

    });

});