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

module.exports = router
