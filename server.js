const express= require("express");
const path=require('path');
const app = express();
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});
app.get("/vendorView.html",function(req,res){
    res.sendFile(path.join(__dirname,'vendorView.html'));
});
app.get("/userView",function(req,res){
    res.sendFile(path.join(__dirname,'userView.html'));
});
app.listen(3000,function(){
    console.log("listening at port 3000");
});