const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const User = require("../models/user")
const {auth} = require("../middleware/auth");



router.get("/doctors",(req, res, next) => {
    Doctor.find({})
        .then(data => res.json(data))
        .catch(next);
});
router.post("/user/register",(req,res,next)=>{
    console.log(req.body);
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
})
router.post("/user/google/login",(req,res)=>{
    console.log(req.body);
    User.findOneAndUpdate({ email: req.body.email },{token:req.body.token,tokenExp:req.body.tokenExp}, (err, user) => {
        if(user)
        {
            console.log("user found");
            res.json({loginSuccess: true});
        }else{
            console.log("user not found")
            res.json({loginSuccess: false});
        }
    });
})

router.post("/user/google/signin",(req,res)=>{
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
})

router.post("/user/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // localStorage.setItem("token",user.token);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, 
                        userId: user._id,
                        token: user.token
                    });
            });
        });
    });
});
router.post("/addDoctor",(req,res)=>{
    console.log(req.body);
    const doctor = new Doctor(req.body);
    doctor.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
    
})

router.post("/user/logout",(req,res)=>{
    User.findOneAndUpdate({token:req.body.tk},{ token: "", tokenExp: "" }, (err, doc) => {   
        if (err) return res.json({ success: false, err });
            return res.status(200).send({success: true});
            
        });                                 
    
})
router.get("/user/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        FirstName: req.user.FirstName,
        LastName: req.user.LastName,
        role: req.user.role,
    });
});
router.get("/search",(req,res)=>{
    const name = req.query.name;
    const qualification = req.query.qualification;
    const speciality = req.query.speciality;
    
    let doc = {};
    if(name){
        doc.name= { $regex: name, $options: 'i' }
    }
    if(speciality){
        doc.speciality=speciality
    }
    if(qualification){
        doc.qualification=qualification
    }
    console.log(doc);
    
    Doctor.find(doc,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.json(data)
            console.log(data);
        }
    })
})


module.exports = router;