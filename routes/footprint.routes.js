const express = require('express')
const router = express.Router()

const footprintService = require('../services/footprint.service')

const FootprintCar = require('../models/FootprintCar.model')
const FootprintFlight = require('../models/FootprintFlight.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.post('/flight-form', isAuthenticated, (req, res) => {

    const { _id } = req.payload

    const { passengers, departure_airport, destination_airport } = req.body
    console.log(req.body)

    footprintService
        .getFlightFootprint(passengers, departure_airport, destination_airport)
        .then(response => {
            res.json(response.data)

            const { passengers, legs, distance_value, distance_unit, carbon_kg } = response.data.data.attributes
            console.log(response.data.data.attributes)

            FootprintFlight
                .create({ user: _id, passengers, legs, distance_value, distance_unit, carbon_kg })

        })

        .catch(err => console.log(err))

})

router.post('/car-form', isAuthenticated, (req, res) => {

    const { _id } = req.payload

    const { distance_value, vehicle_model_id } = req.body

    footprintService
        .getCarFootprint(distance_value, vehicle_model_id)
        .then(response => {
            res.json(response.data)


            const { distance_value, vehicle_model, vehicle_make, vehicle_year, distance_unit, carbon_kg } = response.data.data.attributes

            FootprintCar
                .create({ user: _id, distance_value, vehicle_model, vehicle_make, vehicle_year, distance_unit, carbon_kg })


        })
        .catch(err => console.log(err))


})

router.get("/car-custom-footprints/:userId", (req, res) => {


    const { userId } = req.params

    console.log(userId, 'user BAAAAAAAAAAAAAAACK')

    FootprintCar
        .find({ user: userId })
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))

})

router.get("/flight-custom-footprints/:userId", (req, res) => {


    const { userId } = req.params

    console.log(userId, 'user BAAAAAAAAAAAAAAACK')

    FootprintFlight
        .find({ user: userId })
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))

})


//     const { id } = req.params

//     FootprintCar
//         .findByIdAndDelete(id)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })

module.exports = router