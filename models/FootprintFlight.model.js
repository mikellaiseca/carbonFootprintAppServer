const { Schema, model } = require("mongoose");


const footprintFlightSchema = new Schema(
    {

        user: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        passengers: {
            type: Number
        },
        legs: [
            { departure_airport: { type: String }, destination_airport: { type: String } },
            { departure_airport: { type: String }, destination_airport: { type: String } }
        ],
        distance_value: {
            type: Number
        },
        distance_unit: {
            type: String
        },
        carbon_kg: {
            type: Number
        }
    },
    {
        timestamps: true,
    }

)

const FootprintFlight = model('FootprintFlight', footprintFlightSchema)

module.exports = FootprintFlight