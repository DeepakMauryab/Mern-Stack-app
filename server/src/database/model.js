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
userSchema.methods.generateAuthToken=async function(){
    const tokenAuth= await jwt.sign({_id:this._id}, process.env.SECRET_KEY);
    this.tokens= this.tokens.concat({token:tokenAuth});
    this.save();
    return tokenAuth;
    
} 

const userCollection= new mongoose.model("userData", userSchema);
module.exports= userCollection;