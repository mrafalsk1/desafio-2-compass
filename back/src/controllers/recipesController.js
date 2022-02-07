const Recipe = require("../models/Recipes")
const path = require('path')

exports.list = async (req, res) => {
    let recipes
    if (req.query.mostClicked) {
        recipes = await Recipe.find().sort({ clicked: -1 })
    } else {
        recipes = await Recipe.find().exec()
    }
    res.send(recipes)
}
exports.create = async (req, res) => {
    const { nome, valor, descricao, tempo } = req.body
    const imagem = req.file
    const receita = {
        nome,
        valor,
        descricao,
        tempo,
        imagem,
        clicked: 0
    }
    const recipe = await Recipe.create(receita)
    res.send(recipe)
}
exports.update = async (req, res) => {
    const { title, content } = req.body
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, { title, content })
    res.send(recipe)
}
exports.get = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.send(recipe)
}
exports.getImage = async (req, res) => {
    const file = path.join(__dirname, `../../uploads/${req.params.file}`)
    res.sendFile(file)
}
exports.clicked = async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
        $inc: {
            clicked: 1
        }
    })
    res.send(recipe)
}