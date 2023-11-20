const mongoose = require("mongoose")


const roomNumber = new mongoose.Schema({
    bedType: {
        type: String,
        required: true,
    },
    maxPeople: {
        type: String,
        required: true,
    },
    bathroom: {
        type: String,
        
    },
    balcony: {
       type:String,

    },
     roomsNumber: [{ number: Number, unavailableDate: [Date] }]},
{ timestamps: true })

const roomNum = mongoose.model("roomNumber", roomNumber)

module.exports = roomNum