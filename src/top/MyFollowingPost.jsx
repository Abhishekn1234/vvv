import React from 'react'
import { useEffect,useState } from 'react';
import '../css/Home.css';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PostDetail from '../components/PostDetail';
export default function MyFollowingPost() {
  const[data,setData]=useState([]);
  const[comment,setComment]=useState();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);
  const navigate=useNavigate();
useEffect(()=>{
 const token=localStorage.getItem("jwt");
 if(!token){
  navigate('/signup');
 }
 fetch("/myfollowingpost",{
  headers:{
    "Authorization": "ffff " + localStorage.getItem("jwt")
  },
 }).then(res=>res.json())
 .then(result=>{
  console.log(result);
  setData(result)
})
 .catch(err=>console.log(err));
},[])

const toogleComment = (posts) => {
  if (show) {
    setShow(false);
  } else {
    setShow(true);
    setItem(posts);
  }
};

const likes=(id)=>{
fetch("/like",{
  method:"put",
  headers:{
   "Content-Type":"application/json",
   "Authorization": "ffff " + localStorage.getItem("jwt") 
  },
  body:JSON.stringify({
    postId:id,
  })
}).then(res=>res.json())
.then((result)=>{
  const newData=data.map((posts)=>{
    if(posts._id==result._id){
      return result
    }else{
      return posts
    }
  })
  setData(newData);
  console.log(result);
})

}
const unlikes=(id)=>{
  fetch("/unlike",{
    method:"put",
    headers:{
     "Content-Type":"application/json",
     "Authorization": "ffff " + localStorage.getItem("jwt") 
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then((result)=>{
    const newData=data.map((posts)=>{
      if(posts._id==result._id){
        return result
      }else{
        return posts
      }
    })
    setData(newData);
    console.log(result);
  })
  
  }
  const makeComment = (text, id) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "ffff " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) =>
          posts._id === result._id ? result : posts
        );
        setData(newData);
        setComment("");
        notifyB("Comment posted");
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
        notifyA("Error posting comment");
      });
  };
  
  return (
    <div className='home'>
      {data.map((posts)=>{
        return(
          <div className="card">
   
          <div className="card-header">
            <div className="card-pic">
              <img src="https://images.ctfassets.net/1wryd5vd9xez/4DxzhQY7WFsbtTkoYntq23/a4a04701649e92a929010a6a860b66bf/https___cdn-images-1.medium.com_max_2000_1_Y6l_FDhxOI1AhjL56dHh8g.jpeg" alt="" />
            </div>
            <h5>
              <Link to={`/profile/${posts.postedBy._id}`}>
              {posts.postedBy.name}
              </Link>
             
              
              </h5>
    
          </div>
          <div className="card-image">
            <img src={posts.photo} alt="" />
          </div>
    
          <div className="card-content">
            {
              posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
              (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=>{unlikes(posts._id)}}>
               favorite
       
              </span>):(
                   <span className="material-symbols-outlined"onClick={()=>{likes(posts._id)}} >
                   favorite</span>
              )
            }
          
    
          
           <p>{posts.likes.length} Likes</p>
           <p>{posts.body}</p>
           <p style={{fontWeight:"bold",cursor:"pointer"}} 
           onClick={()=>{toogleComment(posts)}}>View All Comments</p>
          </div>
    
          <div className="add-comment">
          <span className="material-symbols-outlined" >
            mood
    
           </span>
           <input type="text" placeholder='Add a comment' value={comment} onChange={(e)=>{setComment(e.target.value)}} />
           <button className='comment'
           onClick={()=>{makeComment(comment,posts._id)}} >Post</button>
          </div>
         </div>
        )
      })}
      {show &&(
       <div className="showComment">
       <div className="container">
       <div className="postPic"> 
       <img src={item.photo} alt="" />
       </div>
         <div className="details">

         <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
           <div className="card-pic">
             <img src="https://images.ctfassets.net/1wryd5vd9xez/4DxzhQY7WFsbtTkoYntq23/a4a04701649e92a929010a6a860b66bf/https___cdn-images-1.medium.com_max_2000_1_Y6l_FDhxOI1AhjL56dHh8g.jpeg" alt="" />
           </div>
           <h5>{item.postedBy.name}</h5>
   
         </div>
         <div className="commemt-section" style={{borderBottom:"1px solid #00000029"}}>
           {item.comments.map((comment)=>{
               return(  <p className='comm'>
                 <span className='commenter' style={{fontWeight:"bolder"}}>
                 {comment.postedBy.name} {" "}</span>
    
                 <span className="comment-text">
                 {comment.comment}
                 </span>
               </p>
               )
           })}
          </div>
         <div className="card-content" >
           <p>{item.likes.length} Likes</p>
          <p>{item.body}</p>
         </div>
         <div className="add-comment">
         <span className="material-symbols-outlined" >
           mood
   
          </span>
          <input type="text" placeholder='Add a comment' value={comment} onChange={(e)=>{setComment(e.target.value)}} />
          { <button className='comment'onClick={()=>{makeComment(comment,item._id);toogleComment();}} >Post</button> }
         </div>
       </div>
       </div>
       <div className="close-comment" onClick={()=>{toogleComment()}}>
       <span className="material-symbols-outlined material-symbols-outlined-comment" >
          close
   
          </span>
       </div>
       <PostDetail item={item} />
     </div>)
      }

     

    </div>
  )
}
