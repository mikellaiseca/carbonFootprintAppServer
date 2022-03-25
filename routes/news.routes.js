const express = require('express')
const router = express.Router()
const newsService = require('../services/news.service')

router.get('/news', (req, res) => {

    newsService
        .getFullListNews()
        .then(response => { res.json(response.data) })
        .catch(err => console.log(err))
})

module.exports = router
