const mongoose = require('mongoose')
const Titulo = require('../models/titulo')

const criaTitulo = async (req,res) =>{
     const titulo = new Titulo({
         _id: new mongoose.Types.ObjectId(),
         nome: req.body.nome,
         descricao: req.body.descricao,
         genero: req.body.genero,
         estudio: req.body.estudio,
     })

     const tituloJaExiste = await Titulo.findOne({nome: req.body.nome})
     if(tituloJaExiste) {
         return res.status(409).json({error: "Título já cadastrado!"})
     }

     try{
         const novoTitulo = await titulo.save()
         return res.status(201).json(novoTitulo)

     }catch (err){
         return res.status(400).json({message: err.message})

     }
}

const mostraTitulos = async (req, res) =>{
    const titulos = await Titulo.find().populate('estudio')
    return res.status(200).json(titulos)
}

const atualizaTitulos = async (req, res)=>{
    try {
        const titulo = await Titulo.findById(req.params.id)
        if (titulo == null) {
            return res.status(404).json({ message: 'livro não encontrado!'})
        }

        if (req.body.nome != null) {
            titulo.nome = req.body.nome
        }

        if (req.body.descricao != null) {
            titulo.descricao = req.body.descricao
        }

        if (req.body.genero != null) {
            titulo.genero = req.body.genero
        }

        

        const tituloAtualizado = await titulo.save()
        res.json(tituloAtualizado)
    
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}


const deletaTitulos = async (req, res)=>{
    try {
        const titulo = await Titulo.findById(req.params.id)
        if (titulo == null) {
        return res.status(404).json({ message: 'Titulo não encontrado'})
        }
    
        await titulo.remove()
        res.json({ message: 'Titulo deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

}

const mostraTitulosGhibli = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Ghibli")
    return res.status(200).json(titulosFiltrado)
}

const mostraTitulosPixar = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Pixar")
    return res.status(200).json(titulosFiltrado)
}

const mostraTitulosMarvel = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Marvel")
    return res.status(200).json(titulosFiltrado)
}

module.exports = {
    criaTitulo,
    mostraTitulos,
    mostraTitulosMarvel,
    deletaTitulos,
    mostraTitulosGhibli,
    mostraTitulosPixar ,
    atualizaTitulos
}