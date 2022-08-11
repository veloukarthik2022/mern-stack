const express = require('express');
const route = require('./route/routes');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()
const cors = require('cors');
const path = require('path');


app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.use("/api",route)

app.use(express.static(path.join(__dirname,'/view/mern-stack/build')));

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, 'view/mern-stack/build', 'index.html')); 
});

const MONGO = '';

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to database')
    // listen to port
    // app.listen(process.env.PORT, () => {
    //   console.log('listening for requests on port', process.env.PORT)
    // })
  })
  .catch((err) => {
    console.log(err)
  }) 






app.listen(5000, () => {
    console.log("listening the port 5000");
})