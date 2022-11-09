const { Router } = require("express");
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');
const {
    crearTipo, getTipo, UpdateTipo, DeleteTipo,
} = require("../controllers/tipoAsignatura.controller");
const router = Router();

router.get("/", getTipo);

router.post("/",
[
    validarJWT,
    check('nombretipo','El nombre del tipo de Asignatura es obligatorio').not().isEmpty(),
    validarCampos,
] ,
crearTipo);

router.put("/:id",[
    validarJWT,
    check('nombretipo','El nombre del nivel academico es obligatorio').not().isEmpty(),
    validarCampos,
] , UpdateTipo);
router.delete("/:id",validarJWT,DeleteTipo);

module.exports = router;
