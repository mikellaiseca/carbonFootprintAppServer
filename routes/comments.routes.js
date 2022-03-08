const router = require("express").Router();
const Comment = require('../models/Comment.model')


router.post('/create-comment', (req, res, next) => {
    const { author, profile, content, date } = req.body

    Comment
        .create({ author, profile, content, date })
        .then(response => res.status(200).json(response)) //esstado correcto
        .catch(err => res.status(500).json(err))

})

router.delete('/delete-comment/:comment_id', (req, res) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndDelete(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get(`/comments/:id`, (req, res) => {

    const { id } = req.params

    Comment
        .findById(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get(`/comments/profile/:id`, (req, res) => {

    const { id } = req.params

    Comment
        .find({ profile: id })
        .populate('author')
        .populate('profile')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router;