const { Schema, model } = require("mongoose");

const AsignaturaSchema = Schema({
  //
  matricula: {
    type: Schema.Types.ObjectId,
    ref: 'Matricula',
    required: true
  },
  asignatura: {
    type: Schema.Types.ObjectId,
    ref: 'Asignatura',
    required: true
  },
});

module.exports = model("DetalleMatricula", AsignaturaSchema);
