const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerPeople = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: String,
    },date: {
        type: Date,
        default: Date.now,
      }

});


  registerPeople.methods.generateAuthToken = async function () {
    try {
        const data = await userSchema.findById(this._id)
        const token = jwt.sign({ data }, process.env.SECRET_KEY);
        await this.save();
        console.log("my token", token)
        return token;
        
    } catch (error) {
        res.send("the error part" + error);
    }
  }

//Converting password into Hash
registerPeople.pre("save", async function(next){
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10);
        }
    next();
    })  
const userSchema = new mongoose.model("userSchema",registerPeople )
module.exports = userSchema