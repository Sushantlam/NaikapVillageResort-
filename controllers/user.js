const userSchema = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")

 async function createUser(req,res){
    const {email, password, userName}= req.body
    

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password,salt)

    const result = req.files.images
    console.log(result);

    try {
        const img = await cloudinary.uploader.upload(result.tempFilePath, { folder: "user" })
        console.log(img);
        const newUser = new userSchema({
            email: email,
            password:hash,
            userName:userName,
            images:{
                public_id: img.public_id,
                url: img.secure_url
            }
           
        })
        const finalUser = await newUser.save()
        res.status(201).json({finalUser})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

async function loginUser(req,res){
    const loginEmail = await userSchema.findOne({email: req.body.email})
    if(!loginEmail) return res.status(500).send("This email is not registered")

    const loginPassword = await bcrypt.compare(req.body.password, loginEmail.password)
    if(!loginPassword) return res.status(500).send("Your password is not right")

    const token= jwt.sign({id: loginEmail._id}, process.env.SECRET, {expiresIn:'7d'})
    const {password, ...otherDetails}= loginEmail._doc

    res.cookie("access_token", token,{
        httpOnly: true,
    }).status(200).json({details: {...otherDetails}})

}

module.exports ={createUser, loginUser}