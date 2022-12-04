const express = require("express");
const router = express.Router();
const userCollection = require("../database/model");
const bcrypt = require("bcryptjs");
const auth = require("../authentication/auth");

router.post("/Register", async (req, res) => {
    const { name, email, mobile, password, cpass } = req.body;
    try {
        const userData = await userCollection({ name, email, mobile, password, cpass });
        await userData.save();
        res.status(201).json({ message: "successfully registerd" });
    } catch (error) {
        res.status(422).json({ error: "some error is occured" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await userCollection.findOne({ email: email });
        const match = await bcrypt.compare(password, data.password);

        if (match) {
            const token = await data.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + (24 * 3600000)),
                httpOnly: true
            });
            res.json({ message: "login succesfully" });
        }
    } catch (error) {
        res.status(422).json({ error: "data incorrect" });
    }
});

router.get("/about", auth, (req, res) => {
    res.send(req.userData);
});

router.get("/logout", auth, async (req, res) => {
    try {
      
            req.userData.tokens = req.userData.tokens.filter((ele) => {
                return ele.token != req.token;
            });

        await req.userData.save();
        res.clearCookie("jwtoken", { path: "/" });
        res.status(200).send("user logout");
    } catch (error) {
        console.log(error);
    }
});
router.get("/getData", auth, (req, res) => {
    res.send(req.userData);
});



module.exports = router;
