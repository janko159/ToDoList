const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const listModel = require("./Schema/listSchema");
const itemModel = require("./Schema/itemSchema");
const mongoose = require("mongoose");
const { name } = require("ejs");

mongoose.connect("mongodb+srv://Janko:Janko345@cluster0.54lonfo.mongodb.net/todoList");

const app = express();


const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const Item1 = new itemModel({
    name: "Welcome to your todoList!"
});

const Item2 = new itemModel({
    name: "Hit the + button to add a new item."
})

const Item3 = new itemModel({
    name:"<-- Hit this to delete an item"
})

const defaultItems = [Item1,Item2,Item3];

const listSchema = [];

app.get("/", async (req,res) => {
    

    allItems = await itemModel.find({});

    

    if(allItems.length === 0){
        itemModel.insertMany(defaultItems);

        res.redirect("/");
    }else{
        res.render("list", {listTitle:"Today", items:allItems});
    }
   
});

app.post("/", (req,res) =>{
    console.log(req.body);
    const itemName = req.body.newItem;

    
    
    const itemUnit = itemModel.create({name:itemName});
    res.redirect("/");
});

app.post("/delete", async (req,res) =>{
    const checkedItemId = req.body.checkbox;
    await itemModel.deleteOne({_id:checkedItemId});
    res.redirect("/");
});

app.post("/work", (req,res) =>{
    let item = req.body.newItem;
    workItems.push(item);

    res.redirect("/work")
});

app.get("/about", (req,res) =>{
    res.render("aboout");
})

app.listen(3000, () =>{
    console.log("Server is listening on port 3000.")
}); 