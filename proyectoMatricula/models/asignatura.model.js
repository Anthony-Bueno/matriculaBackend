const { Schema, model } = require("mongoose");
//const { schema } = require("./docente.model");
const AsignaturaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  /* docente:[
     {
         type: Schema.Types.ObjectId, ref:'docente.model', autopopulate:true,
     }
   ],
   tipo:[
     {
         type: Schema.Types.ObjectId, ref:'tipo.model', autopopulate:true,
     }
   ]*/
  docente: {
    type: Schema.Types.ObjectId,
    ref: 'Docente',
    required: true
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: 'Tipo',
    required: true
  },
});

//schema.plugin(require('mongoose-autopopulate'));
module.exports = model("Asignatura", AsignaturaSchema);
