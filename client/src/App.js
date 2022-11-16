import React from "react";
 
import { Route, Routes } from "react-router-dom";
 
import Add from "./components/add"; 
import Login from "./components/login";
import Upload from "./components/upload";

//import ChatBox from "./components/chatbox";
 
const App = () => {
 return (
   <div>
         <Routes>
         <Route path="/add" element={<Add />} />
         <Route path="/login" element={<Login />} />
         <Route path="/upload" element={<Upload />} />
         </Routes>
   </div>
 );
};


export default App;
