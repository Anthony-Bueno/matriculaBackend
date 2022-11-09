const { Schema, model } = require("mongoose");
const DocenteSchema = Schema({
    nombre: {
        type: String,
        required: true,
      },
      apellido: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      direccion: {
        type: String,
      },
     
});
//module.exports = model("Usuario", DocenteSchema);
module.exports = model("Docente", DocenteSchema);