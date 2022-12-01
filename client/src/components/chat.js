//import React, { useEffect } from 'react'
import "./App.css"

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');
export default function chat() {
    let name = "name";
    async function fetchData() {
        const response = await fetch(`http://localhost:3001/getUser/`);
        const record = await response.json();
        name = record.username
        
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
        //const messageArea = document.getElementById('message__area');
        const textarea = document.getElementById('textarea');
        appendMessage(msg, 'outgoing')
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
