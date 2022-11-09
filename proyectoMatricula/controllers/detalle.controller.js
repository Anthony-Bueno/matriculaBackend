const { response } = require('express');
const Asignatura=require('../models/detalle.model')



const getDetalle=async(req,res)=>{
    const asignatura = await Asignatura.find()
                                .populate('asignatura','nombre')
                                .populate('matricula','fecha grupo ')
    res.json({
        ok: true,
        asignatura
    })
}


module.exports={

getDetalle

}
    