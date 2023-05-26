const express = require('express');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const date = require(__dirname + '/date.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

let items = ["Algorithms", "Quiz", "Agile"];

let workItems = [];

app.set('view engine', "ejs")

app.get("/", function(req, res){

 let day = date.getDate();
  res.render("list", {listTitle: day, newListItem: items});
});

app.post("/", function(req, res){

  let item = req.body.newItem;
  
  if(req.body.list === "Work"){
    workItems.push(item)
    res.redirect("/work");
  }else{
     items.push(item);
     res.redirect("/");
  }
});


app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItem: workItems});
})


app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
});



app.listen(3000, function(){
  console.log("listening at port 3000")
});