import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./landing.css"



export default function Landing() {

    
    
    return (
<div class="wrapper">
   <div id="navbar">
    <a href="#" id = "logo"><h1>Swarat</h1></a>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="posts.html">Posts</a></li>
      <li><a href="http://localhost:3000/login">Login</a></li>
    </ul>
    
   </div>
   <div class="hero">
      <h3>Swarat</h3>
      <h1>Let's make a difference</h1> 
    <p>WE ARE AN INDEPENDENT ORGANISATION OF VOLUNTEERS, WHO ARE DARING TO BRING TO A CHANGE THROUGH WORDS FOLLOWED BY ACTIONS </p>
      
    </div>
  </div>
    );
}
