const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'imdbprojectteam@gmail.com',
        pass: 'popino2022'
    }
})

module.exports = transporter