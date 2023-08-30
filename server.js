const express= require("express")
const connectDB = require("./config/connectDB")
require ("dotenv").config({path: "./config/.env"})
const User = require ("./models/User")
const router =express.Router()
const app = express 

connectDB
app.use("/api", router)
router.use(exress.json())

router.get("/user",async (req, res) => {
    try {
       const users = await User.find()
       res.status(200).json({message: "Getting all users", results:users})
    } catch (error) {
        res.status(404).json({ERROR: error})
        
    }

})

router.post("/user",async (req, res) => {
    try {
        const {name} = req.body
        const newUser = new User({name})
        const user = await newUser.save()
       const users = await User.find()
       res.status(201).json({message: "User saved", results:users})
    } catch (error) {
        res.status(404).json({ERROR: error})
        
    }

})

router.put("/user/:id" , async (req, res) => {
    const {id}= req.params
    
    try {
       await User.findByIdAndRemove(id) 
       res.status(200).json({message:"User deleted"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
        
    }
})

router.delete("/user/:id" , async (req, res) => {
    const {id}= req.params
    const {name}=req.body
    try {
       await User.findByIdAndUpdate({_id:id}, {$set:{name:name}}) 
       res.status(200).json({message:"User updates"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
        
    }
})

const PORT= process.env.PORT

app.lisen(PORT, (err) =>{
    err ? console.log(err)
        : console.log(`server running on port ${PORT}`)
})