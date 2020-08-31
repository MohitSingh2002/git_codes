const mongoose = require("mongoose");

const post_schema = mongoose.Schema({
    uid: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    photourl: {
        type: String,
    },
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    phone: {
        type: String,
    },
    college: {
        type: String,
    },
    githubPost: {
        type: String,
    },
    language: {
        type: String,
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", post_schema);
