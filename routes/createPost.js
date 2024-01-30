const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");
router.get("/allposts",requireLogin,(req,res)=>{
    POST.find()
    .populate("postedBy","_id name Photo")
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})


router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic);
    
    

    if (!pic || !body) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    console.log("User:", req.user);

    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    });

    post.save()
        .then(result => {
            return res.json({ post: result });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        });
});
router.put('/like', requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy","_id name Photo")
    .exec()
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err });
    });
});

router.put('/unlike', requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy","_id name Photo")
    .exec()
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err });
    });
});

router.get('/myposts',requireLogin,(req,res)=>{
 POST.find({postedBy:req.user._id})
 .populate("postedBy","_id name Photo")
 .populate("comments.postedBy","_id name")
 .sort("-createdAt")
 .then(myposts=>{
    res.json(myposts)
 })
})
router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedBy:req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec()
    .then(result=>{
     res.json(result)
    })
    .catch(err=>{
        console.error(err);
        res.status(422).json({ error: err });
    })
})

router.delete('/deletePost/:postId', requireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec()
        .then(post => {
            if (!post) {
                return res.status(422).json({ error: "Post not found" });
            }

            // Check if the user trying to delete the post is the one who created it
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                return post.remove();
            } else {
                return Promise.reject("You are not authorized to delete this post");
            }
        })
        .then(result => {
            return res.json({ message: "Post deleted successfully" });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err || "Error deleting post" });
        });
});

router.get('/myfollowingpost', requireLogin, (req, res) => {
    POST.find({postedBy:{$in:req.user.following}})
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .then(posts => {
        res.json(posts)
      })
      .catch(err => {
       console.log(err)
        
      })
  })
  

  
module.exports = router;
