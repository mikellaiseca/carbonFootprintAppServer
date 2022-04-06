const axios = require('axios')

class FootprintService {

    constructor() {
        this.app = axios.create({
            baseURL: 'https://www.carboninterface.com/api/v1'
        })
    }

    getFlightFootprint(passengers, departure_airport, destination_airport) {

        const data = {

            "type": 'flight',
            "passengers": passengers,
            "legs": [
                { "departure_airport": departure_airport, "destination_airport": destination_airport },
                { "departure_airport": destination_airport, "destination_airport": departure_airport }
            ]
        }

        return this.app.post('/estimates', data, { headers: { Authorization: `Bearer ${process.env.CARBONTOKEN}` } })
    }

    getCarFootprint(distance_value, vehicle_model_id) {

        const data = {
            "type": 'vehicle',
            "distance_unit": "km",
            "distance_value": distance_value,
            "vehicle_model_id": vehicle_model_id
        }

        return this.app.post('/estimates', data, { headers: { Authorization: `Bearer ${process.env.CARBONTOKEN}` } })
    }

    getShippingFootprint(weight_unit, weight_value, distance_value, transport_method) {

        const data = {
            "type": 'shipping',
            "weight_unit": weight_unit,
            "weight_value": weight_value,
            "distance_unit": "km",
            "distance_value": distance_value,
            "transport_method": transport_method,
        }

        return this.app.post('/estimates', data, { headers: { Authorization: `Bearer ${process.env.CARBONTOKEN}` } })
    }

}

const footprintService = new FootprintService()

module.exports = footprintService