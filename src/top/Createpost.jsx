import React, { useState, useEffect } from 'react';
import '../css/Createpost.css';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate=useNavigate();
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);
  const postDetails = () => {
    console.log(body, image)

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-photo");
    data.append("cloud_name", "dnrvvwi47");

    fetch("https://api.cloudinary.com/v1_1/dnrvvwi47/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "ffff " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      })
        .then(res => res.json())
        .then(data => {if(data.error){
          notifyA(data.error);
        }else{
          notifyB("Successfully posted");
          navigate('/');
        }})
        .catch(err => console.log(err));
    }
  }, [url]);

  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };

  return (
    <div className='createPost'>
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
      </div>
      <div className="main-div">
        <img id="output" src="https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png" alt="Preview" />
        <input type="file" accept='image/*' onChange={(event) => { loadfile(event); setImage(event.target.files[0]) }} />
      </div>
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src="https://images.ctfassets.net/1wryd5vd9xez/4DxzhQY7WFsbtTkoYntq23/a4a04701649e92a929010a6a860b66bf/https___cdn-images-1.medium.com_max_2000_1_Y6l_FDhxOI1AhjL56dHh8g.jpeg" alt="User" />
          </div>
          <h5>Ram</h5>
        </div>
        <textarea value={body} onChange={(e) => { setBody(e.target.value) }} type="text" placeholder='Write A caption....'></textarea>
      </div>
    </div>
  );
}
