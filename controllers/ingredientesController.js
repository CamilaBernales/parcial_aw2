const connection = require("../db");

exports.obtenerIngredientes = (req, res) => {
  try {
    connection.query("SELECT * FROM ingredientes", (err, results) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Error al obtener ingredientes de la base de datos" });
      } else {
        res.json({ ingredientes: results });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener ingredientes de la base de datos" });
  }
};

exports.agregarIngrediente = (req, res) => {
  try {
    const nuevoIngrediente = req.body;
    connection.query(
      "INSERT INTO ingredientes SET ?",
      nuevoIngrediente,
      (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ error: "Error al agregar ingrediente a la base de datos" });
        } else {
          res.json({ ...nuevoIngrediente, id: result.insertId });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al agregar ingrediente a la base de datos" });
  }
};
