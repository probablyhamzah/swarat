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
                <label for="Describe">Add Description</label>
                
                <textarea id="Describe" name="Describe" rows="4" cols="50" placeholder="Add the text here..."></textarea>
                <button type="button" class="button">
                    <span class="button__text">Upload photo</span>
                    <span class="button__icon">
                        <ion-icon name="images-outline"></ion-icon>
                    </span>
                </button>
                <button type="button" class="button1">
                    <span class="button__text1">Add Location</span>
                    <span class="button__icon1">
                        <ion-icon name="location-outline"></ion-icon>
                    </span>
                </button>
                <input class="btn" type="submit" value="Submit"/>
            </form>        
    );
}
