const { Router } = require("express");
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');
const {
  crearDocente,
  getDocentes,
  UpdateDocente,
  DeleteDocente,
} = require("../controllers/docente.controller");
const router = Router();

router.get("/", getDocentes);

router.post("/",[
  validarJWT,
  check('nombre','El nombre del Docente es obligatorio').not().isEmpty(),
  check('apellido','El apellido del Docente es obligatorio').not().isEmpty(),
  check('email','El email  es obligatorio').isEmail(),

  validarCampos,
] , crearDocente);

router.put("/:id", [
  validarJWT,
  check('email','El email del Docente es obligatorio').isEmail(),
  validarCampos,
] 
,UpdateDocente);
router.delete("/:id", DeleteDocente);

module.exports = router;
