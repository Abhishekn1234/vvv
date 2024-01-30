const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requireLogin = require("../middleware/requireLogin");

router.put('/follow', requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    })
    .then(result => {
        USER.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        })
        .then(result => res.json(result))
        .catch(err => res.status(422).json({ error: err }));
    })
    .catch(err => res.status(422).json({ error: err }));
});

router.put('/unfollow', requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    })
    .then(result => {
        USER.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        })
        .then(result => res.json(result))
        .catch(err => res.status(422).json({ error: err }));
    })
    .catch(err => res.status(422).json({ error: err }));
});

router.get('/user/:id',(req,res)=>{
    USER.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
       POST.find({postedBy:req.params.id})
       .populate("postedBy","_id")
       .exec()
       .then(post => {
        res.status(200).json({ user, post });
    })
    .catch(err => {
        return res.status(422).json({ error: err });
    });
    
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})
router.put('/uploadProfilePic', requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    })
    .then(result => {
        // Send the response with a single JSON object
        res.status(200).json({ "Successfully updated": result });
    })
    .catch(err => {
        console.log(err);
        res.status(422).json({ error: err });
    });
});

module.exports=router;
