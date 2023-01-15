import React, { useState } from "react";
import { useNavigate } from "react-router";
import './newinfo.css'
import './slider+containerasmodel.css'


export default function Posts() {
    
    
    return (
        <div>
        <div id="navbar">
        <h1>Swarat</h1>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="profile.html">profile</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>

    </div>
    <div class="container">
        <div class="post_heading">
            <h2>POST</h2>
        </div>
        <div class="post_cont">

        </div>
    </div>

    <div class="bg-modal">
        <div class="modal-content">
            <div class="close">+</div>
            <div id="slider">
                <ul id="slideWrap">
                    <li><img src="download (1).jpg" alt=""/></li>
                    <li><img src="images.jpg" alt=""/></li>
                    <li><img src="depositphotos_18781011-stock-illustration-indian-flag-color-creative-wave.jpg" alt=""/>
                    </li>
                    <li><img src="7xm.xyz486207.jpg" alt=""/></li>
                    <li><img src="7xm.xyz893289.jpg" alt=""/></li>
                </ul>
                <a id="prev" href="#">&#8810;</a>
                <a id="next" href="#">&#8811;</a>
            </div>
            <div class="box">
                <div class="contentbox">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus tempora id dignissimos sed
                        pariatur at ad natus commodi beatae reprehenderit, soluta voluptate a assumenda aut cumque
                        saepe, vero amet explicabo!</p>
                </div>
                <button class="submit" type="button">volunteer</button>
            </div>
        </div>
    </div>
    </div>
    );
}

