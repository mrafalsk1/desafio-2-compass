const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    nome: String,
    descricao: String,
    valor: String,
    tempo: String,
    imagem: {
        fielname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
    },
    clicked: Number
})

module.exports = mongoose.model("Recipe", schema)