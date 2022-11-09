const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
 
  getDetalle
  
} = require("../controllers/detalle.controller");
const router = Router();

router.get("/", getDetalle);



module.exports = router;
