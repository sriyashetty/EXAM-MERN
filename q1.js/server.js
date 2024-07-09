const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());



// Start server
const PORT = 3000;
app.listen(PORT,()=>console.log(`Sever is running at port: ${PORT}`))

