const router = require("express").Router();
const mongoose = require("mongoose");

const User = mongoose.model("User");

router.get("/", (req, res) => {
    res.send({
        "OK": true,
    });
});

//Add data(User) to DB.
router.post("/:uid&:name&:email&:photourl&:github&:linkedin&:phone&:college", async (req, res) => {
    try {
        const user = new User();
        user.uid = req.params.uid;
        user.name = req.params.name;
        user.email = req.params.email;
        user.photourl = req.params.photourl;
        user.github = req.params.github;
        user.linkedin = req.params.linkedin;
        user.phone = req.params.phone;
        user.college = req.params.college;
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500);
    }
});

//Get all data(Users) from DB.
router.get("/getAllUsers", async (req, res) => {
    try {
        const sortBy = {updatedAt: -1};
        const user = await User.find({}).sort(sortBy);
        res.send(user);
    } catch (error) {
        res.send(500);
    }
});

//Get Specific User from DB.
router.get("/getSpecificUser/:uid", async (req, res) => {
    try {
        const user = await User.findOne({
            uid: req.params.uid,
        });
        res.send(user);
    } catch (error) {
        res.status(500);
    }
});

//Update Specific User from DB.
router.put("/:uid/updateSpecificUser/:newName&:newemail&:newphotourl&:newgithub&:newlinkedin&:newphone&:newcollege", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({
            uid: req.params.uid
        }, {$set: {name: req.params.newName,
            email: req.params.newemail,
            photourl: req.params.newphotourl,
            github: req.params.newgithub,
            linkedin: req.params.newlinkedin,
            phone: req.params.newphone,
            college: req.params.college,
        }}, {
            new: true,
            // runValidators: true --> It will check all required fields in User Schema.
        });
        res.send(user);
    } catch (error) {
        res.status(500);
    }
});

//Delete Specific User from DB.
router.delete("/deleteSpecificUser/:uid", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
            uid: req.params.uid,
        });
        res.send(`Deleted User with UID : ${req.params.uid}`);
    } catch (error) {
        res.status(500);
    }
});

module.exports = router;
