import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./upload.css"



export default function Upload() {
    
    const [form, setForm] = useState({
    });
    const navigate = useNavigate();
    
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function upload(e) {
        
        
    }
    
    return (
            <form action="">
                <label htmlFor="Describe">Add Description</label>
                
                <textarea id="Describe" name="Describe" rows="4" cols="50" placeholder="Add the text here..."></textarea>
                <button type="button" className="button">
                    <span className="button__text">Upload photo</span>
                    <span className="button__icon">
                        <ion-icon name="images-outline"></ion-icon>
                    </span>
                </button>
                <button type="button" className="button1">
                    <span className="button__text1">Add Location</span>
                    <span className="button__icon1">
                        <ion-icon name="location-outline"></ion-icon>
                    </span>
                </button>
                <input className="btn" type="submit" value="Submit"/>
            </form>        
    );
}
