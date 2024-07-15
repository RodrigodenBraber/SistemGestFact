const { Pool } = require('pg');
const bdConfig = require('../configuracion/bdConfig');

const pool = new Pool(bdConfig);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
