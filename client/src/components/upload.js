import React, { useState } from "react";
import { useNavigate } from "react-router";



export default function Upload() {
    
    function submitForm() {
        // e.preventDefault();
        //const name = document.getElementById("name");
        const files = document.getElementById("files");
        const formData = new FormData();
        //formData.append("name", name.value);
        for (let i = 0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
        }

        console.log("before fetch");
        fetch("http://localhost:3001/upload_files", {
            method: 'POST',
            body: formData
            //     headers: {
            //       "Content-Type": "multipart/form-data"
            //     }
        })
            .then((res) => console.log(res))
            .catch((err) => ("Error occured", err));
        console.log("after fetch");
    }
    return (
        <div className="container">
            <h1>File Upload</h1>
            <form id='form'>
                <div className="input-group">
                    <label htmlFor='files'>Select files</label>
                    <input id='files' type="file" />
                </div>
                <button className="submit-btn" type='submit' onClick={submitForm}>Upload</button>
            </form>
        </div>
    );
}

