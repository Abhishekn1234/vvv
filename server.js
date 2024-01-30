const express = require("express");
const app = express();
const port = process.env.port || 5000;
const { mongourl } = require("./db.js");
const cors = require("cors");
const path=require("path");
app.use(cors());
const mongoose = require("mongoose");
require("./models/model");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./frontend/build/index.html"),
    function(err){
        res.status(500).send(err)
    }
    )
})
app.listen(port, () => {
    console.log("Server is running on port", port);
});
