const { Schema, model } = require("mongoose");
const TipoSchema = Schema({
  nombretipo: {
    type: String,
    required: true,
    unique:true
  },
});
//Se exporta el modelo. Mongoose creara en mongodb un documento en plural: usuarios
module.exports = model("Tipo", TipoSchema);
