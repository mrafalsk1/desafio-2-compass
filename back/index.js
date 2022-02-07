const path = require('path')
require('dotenv').config()
const express = require('express'),
    { initDatabase } = require('./database'),
    port = process.env.PORT,
    app = express(),
    recipesRoutes = require("./src/routes/recipesRoutes"),
    cors = require('cors')


const corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

// var storage = new GridFsStorage({
//     url: 'mongodb://localhost:27017/recipes',
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"]
//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-bezkoder-${file.originalname}`;
//             return filename
//         }
//         return {
//             bucketNme: 
//         }
//     }

// })
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))
app.use("/public", express.static(path.join(__dirname, 'public')));
initDatabase()

app.listen(port, () => {
    console.log(`Server running in port ${port} 🚀`);
})


app.use('/recipes', recipesRoutes)