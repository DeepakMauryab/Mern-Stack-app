const express = require("express");
const router = express.Router();
const userCollection = require("../database/model");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    res.send("homepage")
});
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
            res.json({ message: "login succesfully" });
        }
    } catch (error) {
        res.status(422).json({ error: "data incorrect" });
    }
});



module.exports = router;
