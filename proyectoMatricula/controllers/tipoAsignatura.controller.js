const { response } = require("express");

const Tipo = require('../models/tipoAsignatura.model');

const crearTipo = async (req, res = response) => {
    const tipo = Tipo(req.body);
    try {
        const tipoDB = await tipo.save();
        res.json({
            ok: true,
            tipoDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar tipo de Asignatura, consulte con el administrador'
        })
    }
}
    const getTipo = async (req, res = response) => {
        const tipo = await Tipo.find().populate('nombre');
        res.json({
            ok: true,
           tipo
        })
    }

    const UpdateTipo = async (req, res = response) => {
        const id = req.params.id;
        // const uid = req.uid;

        try {

            const tipo = await Tipo.findById(id);

            if (!tipo) {
                return res.status(404).json({
                    ok: true,
                    msg: 'Tipo de Asignatura no encontrado por id',
                });
            }
            const { nombre, ...cambiosNivel } = req.body;
            if (tipo.nombre !== nombre) {
                const existeNombre = await Tipo.findOne({ nombre });
                if (existeNombre) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un tipo con este nombre'
                    });
                }
            }
            cambiosNivel.nombre = nombre;

            const nivelActualizado = await Tipo.findByIdAndUpdate(id, cambiosNivel, { new: true });


            res.json({
                ok: true,
                nivelActualizado
            })

        } catch (error) {

            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'No se puede actualizar el tipo de Asignatura, consulte con el administrador'+error
            })
        }


    }

const DeleteTipo = async (req, res = response) => {
    const id = req.params.id;

    try {

        const nivel = await Tipo.findById(id);

        if (!nivel) {
            return res.status(404).json({
                ok: true,
                msg: 'Tipo de Asignatura no encontrado por id',
            });
        }

        await Tipo.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El tipo de Asignatura se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el tipo, consulte con el administrador'
        })
    }

}

module.exports = {
    crearTipo,
    getTipo,
    UpdateTipo,
    DeleteTipo
}
