const mongoose = require("mongoose");

// Define the user schema
const placeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    description: {
      type: String,
    },
    photos: {
      type: [String],
    },
    perks: {
      type: [String],
    },
    extraInfo: {
      type: String,
    },
    checkIn: {
      type: Number,
    },
    checkOut: {
      type: Number,
    },
    maxGuests: {
      type: Number,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
