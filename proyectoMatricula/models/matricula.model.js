const { Schema, model } = require('mongoose');
const MatriculaSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    grupo: {
        type: String,
        required: true,
    },
    idAlumno: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Alumno'
    }, 
    codigoPago: {
        type: String,
        required: true,
        unique: true
    },   
});
MatriculaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
   // object.uid = _id;
    return object;
})
module.exports = model('Matricula', MatriculaSchema);
