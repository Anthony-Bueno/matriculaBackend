const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
  crearAsignatura,
  getAsignatura,
  UpdateAsignatura,
  DeleteAsignatura,
} = require("../controllers/asignatura.controller");
const router = Router();

router.get("/", getAsignatura);

router.post("/", [
  validarJWT,
  check('nombre','El nombre de la asignatura es necesaria').not().isEmpty(),
  check('codigo','El codigo es necesario').not().isEmpty(),
  check('docente','El docente debe de ser válido').isMongoId(),
  check('tipo','El tipo debe de ser válido').isMongoId(),
  validarCampos
],  crearAsignatura);

router.put("/:id", [
  validarJWT,
  check('docente','El docente debe de ser válido').isMongoId(),
  check('tipo','El tipo debe de ser válido').isMongoId(),
],  UpdateAsignatura);
router.delete("/:id", DeleteAsignatura);

module.exports = router;
