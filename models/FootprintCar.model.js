const { Schema, model } = require("mongoose");


const footprintCarSchema = new Schema(

    {
        user: {
            type: Schema.Types.ObjectId, ref: 'User'
        },

        distance_value: {
            type: Number
        },
        distance_unit: {
            type: String
        },
        vehicle_make: {
            type: String
        },
        vehicle_model: {
            type: String
        },
        vehicle_year: {
            type: Number
        },
        carbon_kg: {
            type: Number
        }


    },
    {
        timestamps: true,
    }
)

const FootprintCar = model('FootprintCar', footprintCarSchema)

module.exports = FootprintCar


