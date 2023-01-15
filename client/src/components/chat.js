//import React, { useEffect } from 'react'
import "./App.css"

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');
export default function chat() {
    let name = "name", userid = "0";
    
    
    async function fetchData() {
        const response = await fetch(`http://localhost:3001/getUser/`, {credentials: 'include', method:'GET'}).catch(err => console.log(err));
        const record = await response.json();
        name = record.username
        userid = record.userid
        console.log(name)

        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1)
        const formData = new FormData();
        formData.append("chatid", id);
        //const urlParams = new URLSearchParams(queryString);
        
        fetch("http://localhost:3001/setChatID", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({"chatid": id}),
            })
            
        //nsole.log(request)
        
        const res = await fetch("http://localhost:3001/getMessages", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            credentials: 'include'
            });
        const messages = await res.json();
        
        
        
        const messageArea = document.getElementById('message__area');
        messageArea.innerHTML = '';
        
        for (let msg of messages)
        {
            //console.log(msg)
            
            let mainDiv = document.createElement('div')
            let className = '';
            
            if (msg.userid == userid)
                className = 'outgoing'
            else
                className = 'incoming'
            
            mainDiv.classList.add(className, 'message')
            
            let markup = `
                <h4>${msg.username}</h4>
                <p>${msg.message}</p>
               `
             mainDiv.innerHTML = markup
             messageArea.appendChild(mainDiv)
             
        }
        
    }

    fetchData();
    const handlekeydown = event => {
        if (event.key === 'Enter') {
            sendMessage(event.target.value);
        }
    };
    const sendMessage = (message) => {
        let msg = {
            user: name,
            message: message.trim()
        }
        console.log(msg)
        //const messageArea = document.getElementById('message__area');
        const textarea = document.getElementById('textarea');
        appendMessage(msg, 'outgoing')

        fetch("http://localhost:3001/updateChat", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(msg),
            })
        
        textarea.value = ''
        scrolltobottom()
        socket.emit('message', msg);
    }

    socket.on('message1', (msg) => {
        console.log(msg)
        appendMessage(msg, 'incoming')
        scrolltobottom()
    })
    const appendMessage = (msg, type) => {
        let mainDiv = document.createElement('div')
        let className = type;
        mainDiv.classList.add(className, 'message')

        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
        `

        const messageArea = document.getElementById('message__area');
        // const textarea = document.getElementById('textarea');
        mainDiv.innerHTML = markup
        console.log(messageArea);
        // console.log(textarea)
        messageArea.appendChild(mainDiv)
    }
    const scrolltobottom = () => {
        const messageArea = document.getElementById('message__area');
        //const textarea = document.getElementById('textarea');
        window.scrollTo(0,document.body.scrollHeight);
    }
    return (
        <section className="chat__section" >
            <div id="message__area"></div>
            <div>
                <textarea id="textarea" cols="30" rows="1" placeholder="Write a message..." onKeyDown={handlekeydown}></textarea>
            </div>
        </section>
    );
} 
