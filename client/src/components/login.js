import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css"
import 'cross-fetch/polyfill';


export default function Login() {

    const toggle = event => {
        document.querySelector('.cont').classList.toggle('s-signup')
    }
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function login(e) {
        e.preventDefault();
        console.log("in onsubmit\n");
       
        const newUser = { ...form };
        console.log(newUser);
        await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(newUser),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        
        setForm({ username: "", password: "" });
        navigate("/posts.html");
        console.log("redirected (???)")
    }

    async function register(e) {
        e.preventDefault();
        console.log("in register\n");
       
        const newUser = { ...form };
        console.log(newUser);
        await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        
        setForm({ username: "", password: "" });
        navigate("/posts.html");

        
    }
    
    return (
<div className="cont">
    <div className="form sign-in">
        <h2>Sign In</h2>
        <form onSubmit={login}>
            <label>
                <span>Email Address</span>
                <input type="email" name="email" id="username" value={form.username} onChange={(e) => updateForm({ username: e.target.value })}/>
            </label>
        
            <label>
                <span>Password</span>
                <input type="password" name="password" id="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })}/>
            </label>
        
            <button type="submit" className="submit" >Sign In</button>
        </form>
        <a className="back" href="index.html">Go back to Home page</a>
    </div>

    <div className="sub-cont">
        <div className="img">
            <div className="img-text m-up">
                <h1>New to SWARAT?</h1>
                <p>Join us and discover</p>
            </div>
            
            <div className="img-text m-in">
                <h1>Already have an account?</h1>
                <p>Just sign in  </p>
            </div>

            <div className="img-btn" onClick={toggle}>
                <span className="m-up">Sign Up</span>
                <span className="m-in">Sign In</span>
            </div>
        </div>

        <div className="form sign-up">
            <h2>Sign Up</h2>
            <form onSubmit={register}>
                <label>
                    <span>Name</span>
                    <input type="text"/>
                </label>

                <label>
                    <span>Email</span>
                    <input type="email" id="username" value={form.username} onChange={(e) => updateForm({ username: e.target.value })}/>
                </label>

                <label>
                    <span>Password</span>
                    <input type="password" id="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })}/>
                </label>

                
                <button type="submit" className="submit">Sign Up Now</button>
            </form>
        </div>
    </div>
</div>
    );
}
