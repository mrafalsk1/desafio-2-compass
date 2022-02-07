const express = require('express'),
    router = express.Router(),
    recipesController = require('../controllers/recipesController'),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' })

router.get('/', recipesController.list)
router.post('/', upload.single('imagem'), recipesController.create)
router.get('/:id', recipesController.get)
router.get('/image/:file', recipesController.getImage)
router.patch('/clicked/:id', recipesController.clicked)
module.exports = router 