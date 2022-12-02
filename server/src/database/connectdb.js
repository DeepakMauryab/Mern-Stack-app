const mongoose= require("mongoose");

const mongoCon= "mongodb+srv://Deepak55:DEEPAK@cluster0.ppvi992.mongodb.net/MernProject?retryWrites=true&w=majority";

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(mongoCon, mongooseOptions).then(()=>{
    console.log("database connected");
}).catch((e)=>{
    console.log(e);
});
