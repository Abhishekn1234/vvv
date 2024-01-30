import React from 'react'
import '../css/PostDetail.css';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
export default function PostDetail({ item,toogleDetails }) {
  const navigate=useNavigate();
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);
const removePost=(postId)=>{
 if(window.confirm("Do you really want to delete this post?")){
  fetch(`http://localhost:5000/deletePost/${postId}`,{
    method:"delete",
    headers:{
      "Authorization": "ffff " + localStorage.getItem("jwt") 
    },
  })
  .then((res)=>res.json())
  .then((result)=>{
    console.log(result);
    notifyB(result.message);
    toogleDetails();
    navigate('/');
    
  })
 }
  
}

  return (
    <div className="showComment">
       <div className="container">
       <div className="postPic">
  {item && item.photo && <img src={item.photo} alt="" />}


       
       </div>
         <div className="details">

         <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
           <div className="card-pic">
             <img src="https://images.ctfassets.net/1wryd5vd9xez/4DxzhQY7WFsbtTkoYntq23/a4a04701649e92a929010a6a860b66bf/https___cdn-images-1.medium.com_max_2000_1_Y6l_FDhxOI1AhjL56dHh8g.jpeg" alt="" />
           </div>
           {
            item&&item.postedBy.name&&
            <h5>{item.postedBy.name}</h5>
            
           }
           <div className="deletePost" onClick={()=>{removePost(item._id)}}>
           <span className="material-symbols-outlined material-symbols-outlined-delete" >
          delete
   
          </span>
           </div>
          
   
         </div>
         <div className="commemt-section" style={{borderBottom:"1px solid #00000029"}}>
         {
  item && item.comments &&
  item.comments.map((comment) => {
    return (
      <p className='comm' key={comment._id}>
        <span className='commenter' style={{ fontWeight: "bolder" }}>
          {comment.postedBy && comment.postedBy.name} {" "}
        </span>
        <span className="comment-text">
          {comment.comment}
        </span>
      </p>
    );
  })
}

          </div>
         <div className="card-content" >
          {
            item&&item.likes&&
            <p>{item.likes.length} Likes</p>
           
          }
          {
          item&&item.body&&
          <p>{item.body}</p>
          }
          
         </div>
         <div className="add-comment">
         <span className="material-symbols-outlined" >
           mood
   
          </span>
          <input type="text" placeholder='Add a comment' 
          // value={comment} 
          // onChange={(e)=>{setComment(e.target.value)}} 
          />
          { <button className='comment'
          // onClick={()=>{makeComment(comment,item._id);toogleComment();}} 
          >Post</button> }
         </div>
       </div>
       </div>
       <div className="close-comment" 
        onClick={()=>{toogleDetails()}}
       >
       <span className="material-symbols-outlined material-symbols-outlined-comment" >
          close
   
          </span>
       </div>
     </div>
  )
}
