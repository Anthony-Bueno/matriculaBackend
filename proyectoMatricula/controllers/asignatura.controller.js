const { response } = require('express');
const Asignatura=require('../models/asignatura.model')

const crearAsignatura=async(req,res)=>{
    const uid = req.uid;
    const asignatura = new Asignatura({
        docente: uid, 
        ...req.body
    });

    try {

        const AsignaturaDB = await asignatura.save();
   
        res.json({
            ok: true,
            AsignaturaDB 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear asignatura, consulte con el administrador'
        })
    }
}

const getAsignatura=async(req,res)=>{
    const asignatura = await Asignatura.find()
                                .populate('docente','nombre')
                                .populate('tipo','nombretipo ')
    res.json({
        ok: true,
        asignatura
    })
}
const UpdateAsignatura=async(req,res)=>{
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const asignatura = await Asignatura.findById( id );

        if ( !asignatura) {
            return res.status(404).json({
                ok: true,
                msg: 'Asignatura no encontrado por id',
            });
        }

        const cambios = {
            ...req.body,
            usuario: uid
        }

        const asignaturaActualizado = await Asignatura.findByIdAndUpdate( id, cambios, { new: true } );


        res.json({
            ok: true,
            asignaturaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar asignatura, consulte con el administrador'
        })
    }   
}

const DeleteAsignatura=async(req,res)=>{
    const uid = req.params.id;
    try {
        const asignaturaDB = await Asignatura.findById(uid);
        if (!asignaturaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una asignatura con ese id'
            });
        }
        await Asignatura.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Asignatura eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar asignatura'
        });
    }   
    
}

module.exports={
crearAsignatura,
getAsignatura,
UpdateAsignatura,
DeleteAsignatura
}
    