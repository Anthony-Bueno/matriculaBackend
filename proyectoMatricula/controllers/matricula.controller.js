
const { response } = require('express');
const Matricula = require('../models/matricula.model');


const crearMatricula = async (req, res = response) => {
    const { fecha,grupo,idAlumno,codigoPago } = req.body;

    try {
        const existePago = await Matricula.findOne({codigoPago});
        if (existePago) {
            return res.status(400).json({
                ok: false,
                msg: 'El pago ya ha sido registrado'
            });
        }
        const uid=req.uid
        const matricula = new Matricula({idAlumno:uid,...req.body});

        await matricula.save();
        res.json({
            ok: true,
            matricula,
             msg:'matricula creado exitoxamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const getMatricula = async (req, res=response) => { 
    const matriculas = await Matricula.find().populate('idAlumno', 'nombre');
    res.json({
        ok: true,
        matriculas
    })
}

const actualizarMatricula = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const matriculaDB = await Matricula.findById(uid);
        if (!matriculaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una matricula con ese id'
            });
        }
       
        const { codigoPago, ...campos } = req.body;
        if (matriculaDB.codigoPago !== codigoPago) {
            const existecodigoPago = await Usuario.findOne({codigoPago });
            if (existecodigoPago) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una matricula con este codigo de Pago'
                });
            }
        }
        campos.codigoPago = codigoPago;

        //actualizacion de datos
        const matriculaActualizada = await Matricula.findByIdAndUpdate(uid,
            campos, { new: true });
        res.json({
            ok: true,
           // msg: 'matricula actualizada',
            matriculaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar matricula'+error
        });
    }
}

const eliminarMatricula = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const matriculaDB = await Matricula.findById(uid);
        if (!matriculaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una matricula con ese id'
            });
        }
        await Matricula.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Matricula eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar matricula'
        });
    }
}
module.exports = { getMatricula, crearMatricula, actualizarMatricula,eliminarMatricula }
