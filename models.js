const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');

let userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    passsword:{
        type:String,
        required:true
    }
},
    {
        collection:"users",
    }
);
userSchema.plugin(uniqueValidator.{message:"email exist"});
module.exports=mongoose.model(user,userSchema);
