//Main back-end file - Fichero principal del back-end

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;

const cors = require('cors');
const morgan = require('morgan');

const fenomenosRouter = require('./routers/fenomenosRouter');
const investigadoresRouter = require('./routers/investigadoresRouter');
const loginRouter = require('./routers/loginRouter');

//Parse body as JSON - Parseado del body como JSON

app.use(express.json());

//Allow CORS - Permitir CORS

app.use(cors());

//Requests log - Logueo de las peticiones

app.use(morgan('dev'));

//Routers

app.use('/login', loginRouter);
app.use('/fenomenos', fenomenosRouter);
app.use('/investigadores', investigadoresRouter);

//Start - Arranque

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}.`));