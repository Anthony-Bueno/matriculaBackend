const express = require('express'); //de esta forma se importa en node

require('dotenv').config();
const { dbConection } = require('./config/database');
const cors  = require('cors');

//Creando el servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//console.log(process.env); 
 
//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/nivel', require('./routes/nivelacademico.routes'));
app.use('/api/alumno',require('./routes/alumno.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/matricula', require('./routes/matricula.route'));
app.use('/api/tipo', require('./routes/tipoAsignatura.route'));
app.use('/api/docente', require('./routes/docente.route'));
app.use('/api/asignatura', require('./routes/asignatura.route'));
app.use('/api/detalle', require('./routes/detalle.route'));



//app.use('/api/todo', require('./routes/busquedas.routes'));
//app.use('/api/uploads', require('./routes/uploads.routes'));

//Para levantar el servidor
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})





