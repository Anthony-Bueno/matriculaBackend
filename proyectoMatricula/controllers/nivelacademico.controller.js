const { response } = require('express');

const Nivel= require('../models/nivelacademico.model');


const getNivel = async(req, res = response) => {

   // const nivel = await Nivel.find().populate('usuario','nombre');
   const nivel = await Nivel.find().populate('nombre');

    res.json({
        ok: true,
        nivel
    })
} 

const crearNivel = async(req, res = response) => {

   // const uid = req.uid;
    /*const nivel = new Nivel({
       usuario: uid,
        ...req.body 
    });*/
    const nivel = new Nivel(req.body);
 
    try {
        
        const nivelDB = await nivel.save();
        
        res.json({
            ok: true,
            nivel: nivelDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar nivel academico, consulte con el administrador'
        })
    }

}

const actualizarNivel = async (req, res = response) => {
    const id  = req.params.id;
   // const uid = req.uid;

    try {
        
        const nivelDB = await Nivel.findById( id );

        if ( !nivelDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Nivel academico no encontrado por id',
            });
        }
        const { nombre, ...cambiosNivel } = req.body;
        if (nivelDB.nombre !== nombre) {
            const existeNombre = await Nivel.findOne({ nombre });
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un nivel con este nombre'
                });
            }
        }
        cambiosNivel.nombre=nombre;
       /* const cambiosNivel = {
            ...req.body,
            usuario: uid
        }*/

        const nivelActualizado = await Nivel.findByIdAndUpdate( id, cambiosNivel, { new: true } );


        res.json({
            ok: true,
            nivelActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el nivel academico, consulte con el administrador'+error
        })
    }

}

const eliminarNivel = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const nivel = await Nivel.findById( id );

        if ( !nivel ) { 
            return res.status(404).json({
                ok: true,
                msg: 'Nivel academico no encontrado por id',
            });
        }

        await Nivel.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'El nivel academico se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el nivel academico, consulte con el administrador'
        })
    }
}

module.exports = {
    getNivel,
    crearNivel,
    actualizarNivel,
    eliminarNivel
}