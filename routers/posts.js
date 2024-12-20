const express = require('express')
const posts = require('../data/posts.js')
const router = express.Router()
const postController = require('../controllers/postControllers.js')

//middleware per gestire error 404 su tutte le rotte con id
router.param('id', (req, res, next, id) => {

    const post = posts.find((post) => post.id === parseInt(id))

    if(post){
        req.post = post
        next()
    } else {
        res.status(404)
        res.json ({
            from: 'called from middleware',
            error: 'post not found',
            message: 'il post non è stato trovato'
        })
    }
})

//rotta index
router.get('/', postController.index)

//rotta show: dinamica
router.get('/:id', postController.show)

//rotta store
router.post('/', postController.store)

//rotta update: dinamica
router.put('/:id', postController.update)

//rotta modify: dinamica
router.patch('/:id', postController.modify)

//rotta destroy: dinamica
router.delete('/:id', postController.destroy)




module.exports = router