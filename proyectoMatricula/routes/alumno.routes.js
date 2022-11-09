
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
   
const {
    getAlumno, 
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno, 
    
} = require('../controllers/alumno.controller')


const router = Router();

router.get( '/', getAlumno );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del alumno es necesario').not().isEmpty(),
        check('nivelacademico','El id del nivel academico debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearAlumno 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del alumno es necesario').not().isEmpty(),
        check('nivelacademico','El id del estado academico debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarAlumno
);

router.delete( '/:id',
    eliminarAlumno
);

module.exports = router;

 
