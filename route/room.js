const express = require("express")
const router = express.Router()
const {createRoom, getAllRoom, getRoomById, getRoomNumberById}= require("../controllers/room")

router.post("/", createRoom)
router.get("/", getAllRoom)
router.get("/find/:id", getRoomById)
router.get("/find/roomNumber/:id", getRoomNumberById)
module.exports= router