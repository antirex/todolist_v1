const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
let items = [];
let workItems = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); //tells our app to use ejs as our view-engine ...necessary to be under const app;
app.use(express.static("css"));

app.get("/", function (req, res) {
  let day = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let today = day.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: today, newItem: items });
  res.send();
});

app.post("/", function (req, res) {
  let item = req.body.addItem;
    
    console.log(req.body);
    
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItem: workItems });
  res.send();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("your server is live at");
});

