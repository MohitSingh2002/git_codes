const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true},
    (req, res) => {
        console.log("Connected To MongoDB");
    });
