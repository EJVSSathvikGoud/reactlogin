require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const menu = require("./models/menu.js");
const userAuth = require("./routes/user.js");
const {json} = require("express");

//Datebase connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true , useUnifiedTopology: true}).then(() =>{
    console.log(`connection successful`)
}).catch((err) => console.log(err));


//MiddleWare
app.use(cors({origin:"http://localhost:3000" ,credentials : true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

app.use("/api",userAuth);

//EndPoints
app.get("/" , (req, res) =>{
    res.send("deployed")
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`The application started successfully on port 3000`);
});
