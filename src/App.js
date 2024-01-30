
import './App.css';
import React from 'react';
import { createContext,useState } from 'react';
import UserProfile from './components/UserProfile';
import Home from './top/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Profile from './top/Profile';
import Createpost from './top/Createpost';
import { ToastContainer} from"react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context/LoginContext';
import MyFollowingPost from './top/MyFollowingPost';
import Modal from './components/Modal';
function App() {
  const[userLogin,setUserLogin]=useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (

    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
      <Navbar login={userLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/createpost' element={<Createpost/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route path='/profile/:userid' element={<UserProfile/>}></Route>
        <Route path='/followingpost' element={<MyFollowingPost/>}></Route>
      </Routes>
      <ToastContainer theme='dark'/>
      
     {modalOpen&&<Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
