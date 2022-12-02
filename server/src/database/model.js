const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        trim:true,
    },
    tokens:[
        {
            token:{
                type:String,
                trim:true
            }
        }
    ]
});

// hashing  user password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password, 10);
    }
    next();
});

// genrtating a token for user authentication


const userCollection= new mongoose.model("userData", userSchema);
module.exports= userCollection;