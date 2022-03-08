const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: String,

    profileImg: {
      type: String,
      default: "https://www.lareuniondamies.com/wp-content/uploads/2020/05/icono-eco.png"
    },

    role: {
      type: String,
      enum: ['USER', "ADMIN"],
      default: 'USER'
    },

    savedFootprintCar: [{
      type: Schema.Types.ObjectId, ref: 'FootprintCar'
    }],

    savedFootprintPlane: [{
      type: Schema.Types.ObjectId, ref: 'FootprintPlane'
    }],

    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
