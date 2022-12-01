let map, infoWindow;
function download(strData, strFileName, strMimeType) {
  var D = document,
    A = arguments,
    a = D.createElement("a"),
    d = A[0],
    n = A[1],
    t = A[2] || "text/plain";

  a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


  if (window.MSBlobBuilder) {
    var bb = new MSBlobBuilder();
    bb.append(strData);
    return navigator.msSaveBlob(bb, strFileName);
  }



  if ('download' in a) {
    a.setAttribute("download", n);
    a.innerHTML = "downloading...";
    D.body.appendChild(a);
    setTimeout(function () {
      var e = D.createEvent("MouseEvents");
      e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      D.body.removeChild(a);
    }, 66);
    return true;
  };



  var f = D.createElement("iframe");
  D.body.appendChild(f);
  f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
  setTimeout(function () {
    D.body.removeChild(f);
  }, 333);
  return true;
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();


  const locationButton = document.getElementById("bt");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");


  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const formData = new FormData();
          formData.append("lat", pos.lat);
          formData.append("lng", pos.lng)

          console.log("before fetch");
          fetch("http://localhost:3001/sendLocation", {
            method: 'POST',
            body: formData
          })
            .then((res) => console.log(res))
            .catch((err) => ("Error occured", err));


          console.log(pos)
          download(JSON.stringify(pos), 'data.json', 'text/plain');



          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
