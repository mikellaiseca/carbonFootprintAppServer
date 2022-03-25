const axios = require('axios')

class NewsService {

    constructor() {
        this.app = axios.create({
            baseURL: 'https://newsapi.org/v2'
        })
    }

    getFullListNews() {
        return this.app.get(`/everything?q=co2&apiKey=${process.env.NEWSTOKEN}`)
    }

}

const newsService = new NewsService()
module.exports = newsService