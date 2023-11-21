const room = require("../models/room");
const productCreate = require("../models/room")
const cloudinary = require("../utils/cloudinary")
const roomNum = require("../models/roomNumber")


async function createRoom(req, res) {
    console.log(req.body.roomsNumber);
    const { title, price, desc } = req.body; // Include 'title' in the destructuring
  
    const file = req.files.images;
  
    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: "room" });
      const newRoom = new productCreate({
        title: title, // Include 'title' property
        desc: desc,
        price: price,
       
        images: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });
      const newRoomCreate = await newRoom.save();
      res.status(201).json({ newRoomCreate });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  
async function getAllRoom(req,res){
    try {
        const getAllRoom = await room.find()
        console.log(getAllRoom);
        res.status(201).json({getAllRoom})
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function getRoomById(req,res){
 
  try {
    const roomById = await room.findById( req.params.id)
    res.status(201).json({roomById})
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getRoomNumberById(req,res){
  try {
    const id = await room.findById(req.params.id)
    const list = await Promise.all(
      id.rooms.map((roomId)=>{
        console.log(roomId);
      return roomNum.findById(roomId)
    }))
    res.status(201).json({list})
  } catch (error) {
    res.status(500).json({error})
  }

}
  


module.exports={createRoom, getAllRoom, getRoomById, getRoomNumberById}