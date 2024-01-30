import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import PostDetail from './PostDetail';
import { useParams } from 'react-router-dom';

export default function UserProfile({ toogleDetails, selectedPost }) {
  const [user, setUser] = useState("");
  const [isFollow, setisFollow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const { userid } = useParams();
    const followUser = (userId) => {
      fetch("http://localhost:5000/follow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ffff " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setisFollow(true);
        });
    };
    
    const unfollowUser = (userId) => {
      fetch("http://localhost:5000/unfollow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ffff " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setisFollow(false);
        });
    };
    
    
  
    useEffect(() => {
      fetch(`http://localhost:5000/user/${userid}`, {
        headers: {
          Authorization: "ffff " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result.user);
          setPosts(result.post);
  
          if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) {
            setisFollow(true);
          }
        });
    }, [isFollow]);
  
    const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
  
    
  
    return (
      <div className='profile'>
        <div className="profile-frame">
          <div className="profile-pic">
            <img src={user.Photo ? user.Photo : "https://cdn-icons-png.flaticon.com/128/8812/8812070.png"} alt="" />
          </div>
          <div className="profile-data">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h1>{user.name}</h1>
              {user._id !== loggedInUserId && (
                <button
                  className="followBtn"
                  onClick={() => {
                    if (isFollow) {
                      unfollowUser(user._id);
                    } else {
                      followUser(user._id);
                    }
                  }}
                >
                  {isFollow ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="profile-info" style={{ display: "flex" }}>
              <p>{posts.length} posts</p>
              <p>{user.followers ? user.followers.length : "0"} followers</p>
              <p>{user.following ? user.following.length : "0"} following</p>
            </div>
          </div>
        </div>
        <hr style={{ width: "90", opacity: "0.8", margin: "25px auto" }} />
  
        <div className="gallery">
          {posts.map((result) => (
            <img
              key={result._id}
              src={result.photo}
              className='item'
              onClick={() => toogleDetails(result)}
            />
          ))}
        </div>
  
     
  
        {show && selectedPost && (
          <PostDetail item={selectedPost} toogleDetails={toogleDetails} />
        )}
      </div>
    );
  }