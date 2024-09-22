import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DATABASE_URL as string)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`server listening on port ${PORT}`);
            })
            console.log("DB connected");
        }) 

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        minLength: 5,
        MaxLength: 20,
        trim: true
    },
    firstName : {
        type: String,
        required: true,
        minLength: 5,
        maxLength : 20,
        trim: true
    },
    lastName : {
        type: String,
        required: true,
        minLength: 5,
        maxLength : 20,
        trim: true
    }
})

const addressSchema = new mongoose.Schema({
    houseNumber : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    pincode : {
        type : Number,
        required : true
    },
    colony : {
        type : String,
        required : true,

    },
    city : {
        type: String,
        requried: true
    },
    state : {
        type :String,
        requried : true
    },
    country : {
        type :String,
        required : true 
    }

})

const User = mongoose.model("User", userSchema);
const Address = mongoose.model("Address", addressSchema)


app.post('/register', async (req, res) => {
    const { email, firstName, lastName } = req.body;
    const isUser = await User.findOne({email});
    if (isUser) {
        return res.status(404).json({message : "user already existed"});
    }
    const user = await User.create({
        email : email,
        firstName : firstName,
        lastName : lastName
    })
    res.status(200).json({
            message: "success",
            userId : user._id

    });

})

app.post("/login", async(req, res) => {
    const { email } = req.body;
    const isUser = await User.findOne({email : email})
    if (!isUser) {
        return res.status(404).json({message : "invalid user"});

    } 
    res.status(200).json({
        message : "success",
        userId : isUser._id});
})

app.post("/address", async(req, res) => {
    const { houseNumber, pincode, colony, city, state, country, userId } = req.body;
    const isUser =  await User.findOne({_id : userId});
    if (!isUser) {
        return res.status(404).json({message : "Invalid user"});
    }

    const address = await Address.create({
        userId,
        houseNumber,
        pincode,
        city,
        state,
        colony,
        country
    })

    res.status(200).json({
        message : "success",
        address : address
    })

})

