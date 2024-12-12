const express = require('express');
const { getJoyas, getJoyasByFilters } = require('../controllers/joyasController');
const reportMiddleware = require('../middlewares/reportMiddleware');

const router = express.Router();

router.get('/joyas', reportMiddleware, getJoyas);
router.get('/joyas/filtros', reportMiddleware, getJoyasByFilters);

module.exports = router;