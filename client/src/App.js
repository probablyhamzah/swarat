import React from "react";
 
import { Route, Routes } from "react-router-dom";
 
import Add from "./components/add"; 
import Login from "./components/login";
import Upload from "./components/upload";
import Landing from "./static/landing";
import Chat from "./components/chat";
//import Chat from ""
//import ChatBox from "./components/chatbox";
 
const App = () => {
 return (
   <div>
         <Routes>
         
         <Route path="/" element={<Landing />} />
         <Route path="/add" element={<Add />} />
         <Route path="/chat/:id" element={<Chat />} />
         <Route path="/login" element={<Login />} />
         <Route path="/upload" element={<Upload />} />
         <Route exact path="/posts" render={() => {window.location.href="posts.html"}} />
         <Route exact path="/profile" render={() => {window.location.href="profile.html"}} />
         <Route exact path="/upload" render={() => {window.location.href="upload.html"}} />
         <Route exact path="/gmaps" render={() => {window.location.href="gmaps.html"}} />
         </Routes>
   </div>
 );
};


export default App;
