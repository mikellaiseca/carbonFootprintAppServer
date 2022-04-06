const express = require('express')
const router = express.Router()

const footprintService = require('../services/footprint.service')

const FootprintCar = require('../models/FootprintCar.model')
const FootprintFlight = require('../models/FootprintFlight.model')
const FootprintShipping = require('../models/FootprintShipping.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.post('/flight-form', isAuthenticated, (req, res) => {

    const { _id } = req.payload

    const { passengers, departure_airport, destination_airport } = req.body

    footprintService
        .getFlightFootprint(passengers, departure_airport, destination_airport)
        .then(response => {
            res.json(response.data)

            const { passengers, legs, distance_value, distance_unit, carbon_kg } = response.data.data.attributes

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

router.post('/shipping-form', isAuthenticated, (req, res) => {

    const { _id } = req.payload

    const { weight_unit, weight_value, distance_value, transport_method } = req.body

    footprintService
        .getShippingFootprint(weight_unit, weight_value, distance_value, transport_method)
        .then(response => {
            res.json(response.data)

            const { weight_unit, weight_value, distance_value, distance_unit, transport_method, carbon_kg } = response.data.data.attributes

            FootprintShipping
                .create({ user: _id, weight_unit, weight_value, distance_value, distance_unit, transport_method, carbon_kg })
        })
        .catch(err => console.log(err))
})

router.get("/car-custom-footprints/:userId", (req, res) => {

    const { userId } = req.params

    FootprintCar
        .find({ user: userId })
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))

})

router.get("/flight-custom-footprints/:userId", (req, res) => {

    const { userId } = req.params

    FootprintFlight
        .find({ user: userId })
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))

})

router.get("/shipping-custom-footprints/:userId", (req, res) => {

    const { userId } = req.params

    FootprintShipping
        .find({ user: userId })
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
})

router.delete('/delete-footprintCar/:footprintCarId', (req, res) => {

    const { footprintCarId } = req.params

    FootprintCar
        .findByIdAndDelete(footprintCarId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/delete-footprintFlight/:footprintFlightId', (req, res) => {

    const { footprintFlightId } = req.params

    FootprintFlight
        .findByIdAndDelete(footprintFlightId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/delete-footprintShipping/:footprintShippingId', (req, res) => {

    const { footprintShippingId } = req.params

    FootprintShipping
        .findByIdAndDelete(footprintShippingId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router