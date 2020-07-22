const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const products = require('./model/productModel.js');
const csv = require('csvtojson');
const bodyParser = require('body-parser');
const app = express();

const uploadStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});


let uploads = multer({storage:uploadStorage});

mongoose.connect('mongodb://localhost:27017/csv',{useNewUrlParser:true,useUnifiedTopology: true})

app.use(bodyParser.urlencoded({extended:false}));

app.get('/upload',(req,res) => res.sendFile(path.join(__dirname,'./views/index.html')))

app.post('/upload',uploads.single('csv'),(req,res)=>{
   csv().fromFile(req.file.path)
   .then((jsonData) => {
        products.insertMany(jsonData,(err,data)=>{
               if(err){
                   console.log(err);
                   res.send("Given csv file already inserted !!!")
               }else{
                   res.send('Data stored successfully');
               }
        });
      });
   });


PORT = 3000
app.listen(
    PORT,
    () => console.log(`Server is running on port : ${PORT}`))