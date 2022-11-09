/*
    Path: /api/nivel
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');

const { getNivel, crearNivel, actualizarNivel, eliminarNivel } = require ('../controllers/nivelacademico.controller')
const router = Router();

router.get('/', getNivel);
router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del nivel academico es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    crearNivel);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del nivel academico es obligatorio').not().isEmpty(),
        validarCampos,   
    ] ,
    actualizarNivel);

router.delete('/:id',validarJWT, eliminarNivel);

module.exports = router;


