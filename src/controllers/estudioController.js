const mongoose = require('mongoose')
const Estudio = require('../models/estudio')



const criarEstudio = async (req, res) => {
    console.log(req.body)

    const estudio = new Estudio({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        criadoEm: req.body.criadoEm
    })

    const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
    if(estudioJaExiste) {
        return res.status(409).json({error: "Estudio já cadastrado!"})
    }

    try {
        const novoEstudio = await estudio.save()
        res.status(201).json(novoEstudio)
    }catch (err) {
        res.status(500).json({message: err.message})
    }

}

const mostraEstudios = async(req, res) =>{
    try {
        const estudios = await Estudio.find()
    return res.status(200).json(estudios)
}catch(err){
    res.status(500).json({message: err.message})

}


}

const atualizaEstudio = async (req,res) =>{
    const encontraEstudio = await Estudio.findById(req.params.id)
    if(encontraEstudio == null){
        return res.status(404).json({message: 'estudio não encontrado'})

    }
    if (req.body.nome != null) {
        encontraEstudio.nome = req.body.nome
    }

    try{

    const estudioAtualizado = await encontraEstudio.save()
        res.status(200).json(estudioAtualizado)
    
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

const deletaEstudios = async (req, res)=>{
    try {
        const estudios = await Estudio.findById(req.params.id)
        if (estudios == null) {
        return res.status(404).json({ message: 'Titulo não encontrado'})
        }
    
        await estudios.remove()
        res.json({ message: 'Titulo deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

}

module.exports = {
    criarEstudio,
    mostraEstudios,
    atualizaEstudio,
    deletaEstudios
}