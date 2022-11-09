const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    dni:{
        type: String,
        required: true 
    },
    sexo:{
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nivelacademico: {
        type: Schema.Types.ObjectId,
        ref: 'Nivel',
        required: true
    }, 
    
}); 

AlumnoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Alumno', AlumnoSchema ); 