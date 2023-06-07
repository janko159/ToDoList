const {default:mongoose} = require("mongoose");
const itemSchema = require("./itemSchema");


const  listSchema = new mongoose.Schema({
    name:String,
    items:[]
});


module.exports = mongoose.model("List", listSchema);

