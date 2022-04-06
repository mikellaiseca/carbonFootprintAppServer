const { Schema, model } = require("mongoose");

const footprintShippingSchema = new Schema(
    {

        user: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        weight_unit: {
            type: String,
            enum: ['g', 'kg']
        },
        weight_value: {
            type: Number
        },
        distance_value: {
            type: Number
        },
        distance_unit: {
            type: String
        },
        transport_method: {
            type: String,
            enum: ['ship', 'train', 'truck', 'plane']
        },
        carbon_kg: {
            type: Number,
        }
    },
    {
        timestamps: true
    }

)

const FootprintShipping = model('FootprintShipping', footprintShippingSchema)

module.exports = FootprintShipping