const connection = require("../db");
exports.obtenerRecetas = (req, res) => {
  try {
    connection.query("SELECT * FROM recetas", (err, results) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Error al obtener recetas de la base de datos" });
      } else {
        res.json({ recetas: results });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener recetas de la base de datos" });
  }
};

exports.agregarReceta = (req, res) => {
  try {
    const nuevaReceta = req.body;
    connection.query(
      "INSERT INTO recetas SET ?",
      nuevaReceta,
      (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ error: "Error al agregar receta a la base de datos" });
        } else {
          res.json({ ...nuevaReceta, id: result.insertId });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al agregar receta a la base de datos" });
  }
};

exports.actualizarCantidad = (req, res) => {
  try {
    const recetaId = req.params.recetaId;
    const ingredienteId = req.params.ingredienteId;
    connection.query(
      "UPDATE recetas SET ingredienteId = ? WHERE id = ?",
      [ingredienteId, recetaId],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Error al actualizar la cantidad en la base de datos",
          });
        } else {
          res.json({ mensaje: "Cantidad actualizada correctamente" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar la cantidad en la base de datos",
    });
  }
};

exports.eliminarReceta = (req, res) => {
  try {
    const recetaId = req.params.recetaId;
    connection.query(
      "DELETE FROM recetas WHERE id = ?",
      recetaId,
      (err, result) => {
        if (err || result.affectedRows === 0) {
          console.error(err);
          res.status(404).json({ mensaje: "Receta no encontrada" });
        } else {
          res.json({ mensaje: "Receta eliminada correctamente" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar receta de la base de datos" });
  }
};
