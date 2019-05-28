const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const cors = require('cors');


const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');
const listsRouter = require('./routes/lists');

const app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "client", "build")));
// app.options('*',cors());

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin",'http://localhost:3000');
//     next();
// });


app.use('/', indexRouter);
app.use('/notes', notesRouter);
app.use('/lists', listsRouter);

module.exports = app;
