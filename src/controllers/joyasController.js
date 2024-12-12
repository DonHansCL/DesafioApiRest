const pool = require('../config/database');

const prepararHATEOAS = (joyas) => {
    const results = joyas.map((j) => ({
        name: j.nombre,
        href: `/joyas/joya/${j.id}`,
        categoria: j.categoria,
        metal: j.metal,
        precio: j.precio,
        stock: j.stock

    }))
    const total = joyas.length;
    return { total, results}
}

const getJoyas = async (req, res) => {
try {
    const { limits, page, order_by } = req.query;
    const limit = parseInt(limits) || 10;
    const offset = (parseInt(page) - 1) * limit || 0;
    const order = order_by ? order_by.split('_') : ['id', 'ASC'];

    const query = `SELECT * FROM inventario ORDER BY ${order[0]} ${order[1]} LIMIT $1 OFFSET $2`;
    const { rows: joyas } = await pool.query(query, [limit, offset]);

    res.json(prepararHATEOAS(joyas));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJoyasByFilters = async (req, res) => {
    try {
      const { precio_max, precio_min, categoria, metal } = req.query;
      let filtros = [];
      const values = [];
  
      const agregarFiltro = (campo, comparador, valor) => {
        values.push(valor);
        filtros.push(`${campo} ${comparador} $${values.length}`);
      };
  
      if (precio_max) agregarFiltro('precio', '<=', precio_max);
      if (precio_min) agregarFiltro('precio', '>=', precio_min);
      if (categoria) agregarFiltro('categoria', '=', categoria);
      if (metal) agregarFiltro('metal', '=', metal);
  
      let query = 'SELECT * FROM inventario';
      if (filtros.length > 0) {
        query += ` WHERE ${filtros.join(' AND ')}`;
      }
  
      const { rows: joyas } = await pool.query(query, values);
      res.json(prepararHATEOAS(joyas));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { getJoyas, getJoyasByFilters };
