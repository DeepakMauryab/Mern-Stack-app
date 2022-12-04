const mongoose = require("mongoose");

const mongoCon = process.env.DATABASE;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(mongoCon, mongooseOptions).then(() => {
    console.log("database connected");
}).catch((e) => {
    console.log(e);
});
