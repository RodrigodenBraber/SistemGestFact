const db = require('../modelos/baseDatos');

exports.getData = (req, res) => {
  db.query('SELECT * FROM remuneraciones', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result.rows);
  });
};

exports.postData = (req, res) => {
  const { name, value } = req.body;
  db.query('INSERT INTO remuneraciones (name, value) VALUES ($1, $2)', [name, value], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Data inserted successfully' });
  });
};
