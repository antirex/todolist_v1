const express = require("express");
const bodyParser =require("body-parser");
const app = express();
var items =["Stay Positive!"];
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs"); //tells our app to use ejs as our view-engine ...necessary to be under const app;
app.use(express.static("css"));
app.get("/",function(req,res){
    var day = new Date();
   

    var options ={
        weekday : "long",
        day: "numeric",
        month: "long"
    }
    var today =day.toLocaleDateString("en-US",options);

    res.render("list",{weekDay: today, newItem: items});
    res.send();
})

app.post("/",function(req,res){
    var item = req.body.addItem;
    items.push(item);
    res.redirect("/");
    
})

app.listen(process.env.PORT || 3000,function(){
    console.log("your server is live at");
    
})