const { response } = require('express');

const Alumno = require('../models/alumno.model');

const getAlumno = async(req, res = response) => {

    const alumno = await Alumno.find()
                                .populate('usuario','email estado')
                                .populate('nivelacademico','nombre ')
 

    res.json({
        ok: true,
        alumno
    })
}

const crearAlumno = async (req, res = response) => {

    const uid = req.uid;
    const alumno = new Alumno({
        usuario: uid, 
        ...req.body
    });

    try {

        const AlumnoDB = await alumno.save();
   
        res.json({
            ok: true,
            alumno: AlumnoDB 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear alumno, consulte con el administrador'
        })
    }


}

const actualizarAlumno = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const alumno = await Alumno.findById( id );

        if ( !alumno ) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no encontrado por id',
            });
        }

        const cambiosAlumno = {
            ...req.body,
            usuario: uid
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate( id, cambiosAlumno, { new: true } );


        res.json({
            ok: true,
            alumnoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar alumno, consulte con el administrador'
        })
    }

}

const eliminarAlumno = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const alumno = await Alumno.findById( id );

        if ( !alumno ) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no encontrado por id',
            });
        }

        await Alumno.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Alumno borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Alumno no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}