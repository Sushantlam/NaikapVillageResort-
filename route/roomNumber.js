const express = require("express")
const router = express.Router()
const {createRoomNumber, updateRoomAvailability, allRoomNum, roomNumberById}= require("../controllers/roomNumber")

router.post("/:id", createRoomNumber)
router.get("/", allRoomNum)
router.get("/number/:id", roomNumberById)
router.put("/update/:id", updateRoomAvailability)


module.exports= router