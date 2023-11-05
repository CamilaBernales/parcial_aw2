const express = require('express');
const router = express.Router();
//controllers
const ingredientesController = require('./controllers/ingredientesController');
const recetasController = require('./controllers/recetasController');

// Rutas para ingredientes
router.get('/ingredientes', ingredientesController.obtenerIngredientes);
router.post('/ingredientes', ingredientesController.agregarIngrediente);

// Rutas para recetas
router.get('/recetas', recetasController.obtenerRecetas);
router.post('/recetas', recetasController.agregarReceta);
router.put('/recetas/:recetaId/ingredientes/:ingredienteId', recetasController.actualizarCantidad);
router.delete('/recetas/:recetaId', recetasController.eliminarReceta);

module.exports = router;
