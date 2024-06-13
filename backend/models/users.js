const mongoose = require('mongoose')

const UsersSchema=new mongoose.Schema({
    userId:Number,
    name:String,
    email:String
})


module.exports=mongoose.model('Uswwer',UsersSchema)