const express = require('express');
const app = express();
const mongoose =require('mongoose');
const bcrypt =require('bcrypt');
require('./config/db');

//setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Routes setup
const indexRouter = require('./Routes/index');
const userRouter = require('./Routes/user');
const passwordResetRouter = require('./Routes/passwordReset');



app.use('/' , indexRouter);
app.use('/users', userRouter);
app.use('/password-reset', passwordResetRouter);

//start server

const port = 5000;
app.listen(port, () => {
    console.log('server is running on port ${port}');
});