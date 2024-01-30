import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import PostDetail from '../components/PostDetail';
import Profilepic from '../components/Profilepic';

export default function Profile() {
  var picLink="https://cdn-icons-png.flaticon.com/128/8812/8812070.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const[changePic,setchangePic]=useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [user, setUser] = useState("")
  const toogleDetails = (post) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setSelectedPost(post);
    }
  };
  
 const changeProfile=()=>{
  if(changePic){
    setchangePic(false)
  }else{
    setchangePic(true)
  }
 }
  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "ffff " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.post);
        setUser(result.user);
        console.log(pic);
      });
  }, []);

  return (
    <div className='profile'>
      <div className="profile-frame">
        <div className="profile-pic">
          <img onClick={changeProfile} src={user.Photo?user.Photo:picLink} alt="" />
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic? pic.length:"0"} posts</p>
            <p>{user.followers?user.followers.length:"0"} followers</p>
            <p>{user.following?user.following.length:"0"} following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90", opacity: "0.8", margin: "25px auto" }} />

      <div className="gallery">
      {pic.map((result) => (
  <img
    key={result._id}
    src={result.photo}
    className='item'
    onClick={() => toogleDetails(result)}
  />
))}

      </div>

      {show && selectedPost && (
  <PostDetail item={selectedPost} toogleDetails={toogleDetails} pic={pic} />
)}
{
  changePic &&
  <Profilepic changeProfile={changeProfile}/>
}
    </div>
  );
}
