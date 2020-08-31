const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//databse connection
require("./mongo");

//Model
require("./model/User");
require("./model/Post");

//Middleware
app.use(bodyParser.json());

const Port = process.env.PORT || 9000

//Routes
app.use("/users", require("./routes/user_route"));

app.get("/", (req, res) => {
    res.send({
        "name": "Mohit Singh"
    });
});

app.listen(Port, () => {
    console.log("Listening to Post : 9000");
});
