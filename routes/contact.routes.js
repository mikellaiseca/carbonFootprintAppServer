const router = require("express").Router()
const transporter = require('../config/transporter.config')
const { isAuthenticated } = require('../middleware/jwt.middleware')


router.post('/contact-us', isAuthenticated, (req, res) => {
    const { email, message } = req.body

    transporter
        .sendMail({
            from: '"Decarbonize" <imdbprojectteam@gmail.com>',
            to: 'anita.playeo@gmail.com',
            subject: `Contacto desde Decarbonize`,
            text: message,
            html: `<h2>Nuevo mensaje de contacto</h2>
                    <p>Ha recibido un nuevo mensaje de: <b>${email}</b> </p>
                    <p>Mensaje: ${message}</p>`
        })
        .then(info => res.status(200).send(info))
        .catch(error => console.log(error))
})


module.exports = router