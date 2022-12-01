const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

var lat = 0, lng = 0;
function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    console.log(lat, lng)
}

function submitForm(e) {
    e.preventDefault();
    const textarea = document.getElementById("textarea");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("textarea", textarea.value);
    formData.append("lat", lat);
    formData.append("lng", lng);
    
    for(let i = 0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("http://localhost:3001/upload_files", {
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "multipart/form-data"
        }
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}
