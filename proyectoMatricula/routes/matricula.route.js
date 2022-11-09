//accedemos al paquete exprress, pero solo jalamos la propiedad Router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router()

const { getMatricula, crearMatricula, actualizarMatricula,eliminarMatricula } = require('../controllers/matricula.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',validarJWT , getMatricula)

router.post('/',
  [
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('grupo', 'El grupo es obligatorio').not().isEmpty(),
    check('idAlumno','El id del Alumno debe de ser válido').isMongoId(),
    check('codigoPago', 'El codigo de pago es requerido').not().isEmpty(),
    //check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  crearMatricula);

router.put('/:id',
  [
    validarJWT,
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('grupo', 'El grupo es obligatorio').not().isEmpty(),
    check('idAlumno','El id del Alumno debe de ser válido').isMongoId(),
    check('codigoPago', 'El codigo de pago es requerido').not().isEmpty(),
    //check('role','El rol es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarMatricula);

  router.delete('/:id',validarJWT,eliminarMatricula);

module.exports = router;  