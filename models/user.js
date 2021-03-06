const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
 const jwt = require("jsonwebtoken");
const moment = require("moment");



const userSchema = new Schema({
    FirstName: {
        type: String,
        maxlength: 50
    },
    LastName: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String
    },
    password: {
        type: String,
        minlength: 6
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },
    role: {
        type: Number,
        default:0
    } 
})

userSchema.pre("save", function (next) {
    let user = this;
    if(user.isModified("password")){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})
userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}
userSchema.methods.generateToken = function(cb){
    let user = this;
    let token = jwt.sign(user._id.toHexString(),"secret");
    user.token = token;
    let oneHour = moment().add(1,"hour").valueOf();
    user.tokenExp = oneHour;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}
userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}
const User = mongoose.model("user", userSchema);
module.exports = User;