const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')



router.get("/users", (req, res) => {
    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get("/users/:_id", (req, res) => {

    const { _id } = req.params

    User
        .findById({ _id })
        .populate('comments')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put(':user_id/push-comment-post', (req, res) => {

    const { user_id } = req.params
    console.log(comments)

    User
        .findByIdAndUpdate(user_id, { $push: { comments: req.body } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/:comment_id/pull-comment-post', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $pull: { comments: comment_id } }, { new: true })
        .then(response => { res.json(response) })
        .catch(err => res.status(500).json(err))
})

router.put('/push-footprintCar', isAuthenticated, (req, res) => {

    const { _id } = req.payload
    console.log(_id, 'soy la creacion en el back route')
    console.log(req.body, 'soy la creacion creada el REQ BODY')
    console.log(savedFootprintCar)

    User
        .findByIdAndUpdate(_id, { $push: { savedFootprintCar: req.body } })
        .then(response => console.log(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router