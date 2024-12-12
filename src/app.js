const express = require('express');
const joyasRoutes = require('./routes/joyasRoutes');

const app = express();
app.use(express.json())
app.use('/', joyasRoutes)

module.exports = app;