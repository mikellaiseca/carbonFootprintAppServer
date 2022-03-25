module.exports = app => {

    app.use('/api/auth', require('./auth.routes'))

    app.use('/api', require('./comments.routes'))

    app.use('/api/upload', require('./upload.routes'))

    app.use('/api', require('./users.routes'))

    app.use('/api', require('./footprint.routes'))

    app.use('/api', require('./contact.routes'))


}