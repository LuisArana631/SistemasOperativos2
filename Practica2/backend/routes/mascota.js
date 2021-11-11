// Rutas de Mascotas 
// ---> RUTA: /mascotas
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { checkBody } = require('../middlewares/check-body');
const controladorMascota = require('../controller/mascota');

router.get(
    '/', // ruta    
    controladorMascota.verMascotas //función
);

router.post(
    '/', 
    [ //middlewares
        check('mascota', 'El nombre de la mascota es obligatorio').not().isEmpty(),
        check('dueño', 'El nombre del dueño de la mascota es obligatorio').not().isEmpty(),
        check('edad', 'La edad de la mascota es obligatoria').not().isEmpty(),
        checkBody
    ], 
    controladorMascota.crearMascota
);

router.delete(
    '/:id', 
    controladorMascota.eliminarMascota
);

router.put(
    '/:id', 
    [ //middlewares
        check('mascota', 'El nombre de la mascota es obligatorio').not().isEmpty(),
        check('dueño', 'El nombre del dueño de la mascota es obligatorio').not().isEmpty(),
        check('edad', 'La edad de la mascota es obligatoria').not().isEmpty()
    ], 
    controladorMascota.editarMascota
);

module.exports = router;