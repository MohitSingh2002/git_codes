const router = require("express").Router();
const mongoose = require("mongoose");

const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get("/", (req, res) => {
    res.send({
        "OK": true,
    });
});

//Add data(User) to DB.
router.post("/:uid&:name&:email&:photourl&:github&:linkedin&:phone&:college/addUser", async (req, res) => {
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
        const user = await User.find({}).sort(sortBy).populate("posts");
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
        }).populate("posts");
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

//Add Post to DB.
router.post("/:uidUser/addPost/:uid&:name&:email&:photourl&:github&:linkedin&:phone&:college&:githubPost&:language&:description", async (req, res) => {
    try {
        //Find the User.
        const user = await User.findOne({
            uid: req.params.uidUser,
        });
        //Create a Post.
        const post = new Post();
        post.uid = req.params.uid;
        post.name = req.params.name;
        post.email = req.params.email;
        post.photourl = req.params.photourl;
        post.github = req.params.github;
        post.linkedin = req.params.linkedin;
        post.phone = req.params.phone;
        post.college = req.params.college;
        post.githubPost = req.params.githubPost;
        post.language = req.params.language;
        post.description = req.params.description;
        post.user = user._id;
        await post.save();
        //Associate Post with the User.
        user.posts.push(post._id);
        await user.save();
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

//Read all Posts from DB.
router.get("/getAllPosts", async (req, res) => {
    try {
        var sortBy = {updatedAt: -1};
        const post = await Post.find({}).sort(sortBy);
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

//Read specific User's Posts from DB.
router.get("/:uid/getAllPosts", async (req, res) => {
    try {
        const user = await User.findOne({
            uid: req.params.uid,
        }).populate("posts");
        res.send(user.posts);
    } catch (error) {
        res.status(500);
    }
});

//Update specific Post from DB,
router.put("/:postID/updatePost/:uid&:name&:email&:photourl&:github&:linkedin&:phone&:college&:githubPost&:language&:description", async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate({
            _id: req.params.postID
        }, {$set: {
            uid: req.params.uid,
            name: req.params.name,
            email: req.params.email,
            photourl: req.params.photourl,
            github: req.params.github,
            linkedin: req.params.linkedin,
            phone: req.params.phone,
            college: req.params.college,
            githubPost: req.params.githubPost,
            language: req.params.language,
            description: req.params.description
        }}, {
            new: true
        });
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

//Delete specific User's Post from DB.
router.delete("/:postID/deletePost", async (req, res) => {
    try {
        await Post.findOneAndDelete({
            _id: req.params._id,
        });
        res.send(`Deleted Post with ID : ${req.params.postID}`);
    } catch (error) {
        res.status(500);
    }
}); 

module.exports = router;
