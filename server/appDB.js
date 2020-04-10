const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const fenomenosRouter = require('./routers/fenomenosRouter');
const investigadoresRouter = require('./routers/investigadoresRouter');
const loginRouter = require('./routers/loginRouter');
const PORT = process.env.PORT || 4001;

//Parse body as JSON

app.use(express.json());

//Allow CORS

app.use(cors());

//Requests log

app.use(morgan('dev'));

//Routers

app.use('/login', loginRouter);
app.use('/fenomenos', fenomenosRouter);
app.use('/investigadores', investigadoresRouter);

//Start

app.listen(PORT, () => console.log(`Listening on ${PORT}.`));