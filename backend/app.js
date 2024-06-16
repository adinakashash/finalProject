// programmer1711
// i2XhU41j4YO70pdv
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/Users');
const bodyParser = require('body-parser');
const cors =require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use('/user', userRouter);


const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb://localhost:27017';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL || CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error.message));
    