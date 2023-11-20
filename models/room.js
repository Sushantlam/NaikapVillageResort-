const mongoose = require("mongoose")


const roomModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    rooms:{
        type:[String],
    }
    // roomsNumber: [{ number: Number, unavailableDate: [Date] }]
},

    { timestamps: true })

const room = mongoose.model("room", roomModel)

module.exports = room