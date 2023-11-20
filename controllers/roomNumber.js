const roomNum = require("../models/roomNumber")
const room = require("../models/room")


async function createRoomNumber(req,res){
   const roomType = req.params.id
   const newRoomNum = new roomNum(req.body)
   try {
    const roomNumber = await newRoomNum.save()
    try {
        await room.findByIdAndUpdate(roomType, {$push:{rooms:roomNumber._id}})
        res.status(201).json(roomNumber)
    } catch (error) {
        res.status(500).json(error.message)
    }
   } catch (error) {
    res.status(500).json(error.message)
   }
}

async function roomNumberById(req,res){
    try{
  const roomById = await roomNum.findById(req.params.id)
  res.status(201).json({roomById})
    }catch(error){
        res.status(500).json(error)
    }
}
async function allRoomNum(req,res){
    try {
        const getAllRoom = await roomNum.find()
        res.status(201).json({getAllRoom})
    } catch (error) {
        res.status(500).json(error.message);
    }
}
  

async function updateRoomAvailability(req,res){
    try {
        console.log(req.params.id);
        const availablility = await roomNum.updateOne({"roomsNumber._id" : req.params.id}, 
        {$push:{
            "roomsNumber.$.unavailableDate": req.body.din
        }})
        console.log(availablility);
        res.status(201).send("Your status has been updated ")
        
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={createRoomNumber, updateRoomAvailability, allRoomNum, roomNumberById}