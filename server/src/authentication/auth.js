const jwt = require("jsonwebtoken");
const userCollection = require("../database/model");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        
        const userData = await userCollection.findOne({ _id: verifyToken._id, "tokens.token": token });
        
        if (!userData) { throw new error("user not found") }

        req.userData = userData;
        req.token = token;

        next();
    } catch (error) {
        res.status(401).send(" user not login ")
    }
}

module.exports = auth;