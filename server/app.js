
const express = require("express");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/key");

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
  res.send("hello world");
})
app.use(cors());
mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("connection is on...all good");
});
mongoose.connection.on("error", (err) => {
  console.log("error is occured in mongodb",err);
});
require("./models/user");
require("./models/post");
// require(".models/channels")
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

// app.use(require("./routes/auth"))?
// Ul0GW9md6mACfJgg

// if(process.env.NODE_ENV==="production"){
//   app.use(express.static(path.join(__dirname, "..", "client", "build")))
//   const path= require('path')
//   app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'..','client','build','index.html'))
//   })
// }

app.listen(PORT, () => {
  console.log(`server is running  on ${PORT}`);
});
