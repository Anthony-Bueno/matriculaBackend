const { response } = require("express");

const Docente=require('../models/docente.model')

const crearDocente=async(req,res= response)=>{
    const {email,nombre} = req.body;
    try {
        const existeEmail = await Docente.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya ha sido registrado'
            });
        }
        const docente = new Docente(req.body);
        const docenteDB = await docente.save();
        res.json({
            ok: true,
            docenteDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar el docente, consulte con el administrador'+error
        })
    }
}

const getDocentes=async(req,res= response)=>{
    const docente = await Docente.find().populate('nombre');
        res.json({
            ok: true,
           docente
        })
    }

const UpdateDocente=async(req,res= response)=>{
    const id = req.params.id;
    // const uid = req.uid;

    try {

        const docente = await Docente.findById(id);

        if (!docente) {
            return res.status(404).json({
                ok: true,
                msg: 'Docente no encontrado por id',
            });
        }
        const { email, ...cambios} = req.body;
        if (docente.email!== email) {
            const existeNombre = await Docente.findOne({ email });
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un docente con este nombre'
                });
            }
        }
        cambios.email = email;

        const docenteActualizado = await Docente.findByIdAndUpdate(id, cambios, { new: true });
        res.json({
            ok: true,
            docenteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar al docente, consulte con el administrador'+error
        })
    }

    }

const DeleteDocente=async(req,res= response)=>{
    const id = req.params.id;

    try {

        const docente = await Docente.findById(id);

        if (!docente) {
            return res.status(404).json({
                ok: true,
                msg: 'Docente no encontrado por id',
            });
        }

        await Docente.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El Docente se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el docente, consulte con el administrador'
        })
    }
    
}

module.exports={
crearDocente,
getDocentes,
UpdateDocente,
DeleteDocente,
}
    