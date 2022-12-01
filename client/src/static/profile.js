let a = document.querySelector('.left');
console.log(a);
let b = document.createElement('h4');
b.textContent = 'My Profile';
a.appendChild(b);

a = document.querySelector('#email');
console.log(a);
b = document.createElement('p');
b.textContent = 'email';
a.appendChild(b);

a = document.querySelector('#phone');
console.log(a);
b = document.createElement('p');
b.textContent = 'phone';
a.appendChild(b);

a = document.createElement('h3');
a.textContent = 'POST';
document.querySelector('.right').appendChild(a);
function onResponse(response) {
            return response.json();
        }
// <h3>Post</h3>
//             <div class="post">
//                 <div class="titledata">
//                     <div class="thumbnail">
//                         <img src="download (1).jpg " width="150" height="90%" alt="post">
//                     </div>
//                     <div class="para">
//                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur explicabo magnam consequuntur,
//                         nostrum nobis quidem, error corrupti ipsa maxime veniam nulla quisquam cum consequatur
//                         reiciendis vel debitis assumenda facilis reprehenderit?</p>
//                     </div>
//                 </div> 
//             </div>
/*
fetch(`http://localhost:3001/userVolunteered`)
            .then(onResponse)
            .then(json => {
            console.log(json)
            fetch(`http://localhost:3001/allPosts`)
            .then(onResponse)
            .then(json1 => {
            
                          
                  for(let i = 0; i < json.length; i++){
                    for (let j = 0; j < json1.length; j++)
                    {
                    if (json[i] == json1.id)
                    {
                    a = document.createElement('div');
                    a.classList.add('post');
                    document.querySelector('.right').appendChild(a);
                    b = document.createElement('div');
                    b.classList.add('titledata');
                    a.appendChild(b);
                    let c = document.createElement('div');
                    c.classList.add('thumbnail');
                    b.appendChild(c);
                    let d = document.createElement('img');
                    d.src = 'http://localhost:3001/download/' + json[i].pictures;
                    d.width = '150';
                    d.height = '90%';
                    d.alt = 'post';
                    c.appendChild(d);
                    c = document.createElement('div');
                    c.classList.add('para');    
                    b.appendChild(c);
                    d = document.createElement('p');
                    d.textContent = json[i].description;
                    c.appendChild(d);
                    }
                    }
                }
                
          })
})
*/

/*
fetch(`http://localhost:3001/userPosts`)
            .then(onResponse)
            .then(json => {
            
            fetch(`http://localhost:3001/allPosts`)
            .then(onResponse)
            .then(json1 => {
            console.log(json)
            
                for(let i = 0; i < json.length; i++){
                    for (let j = 0; j < json1.length; j++)
                    {
                    if (json[i] == json1.id)
                    {
                    a = document.createElement('div');
                    a.classList.add('post');
                    document.querySelector('.right').appendChild(a);
                    b = document.createElement('div');
                    b.classList.add('titledata');
                    a.appendChild(b);
                    let c = document.createElement('div');
                    c.classList.add('thumbnail');
                    b.appendChild(c);
                    let d = document.createElement('img');
                    d.src = 'http://localhost:3001/download/' + json1[j].pictures;
                    d.width = '150';
                    d.height = '90%';
                    d.alt = 'post';
                    c.appendChild(d);
                    c = document.createElement('div');
                    c.classList.add('para');    
                    b.appendChild(c);
                    d = document.createElement('p');
                    d.textContent = json1[j].description;
                    c.appendChild(d);
                    }
                    }
                }
                
                
          })
})
*/

/*
fetch(`http://localhost:3001/getUserPosts`)
            .then(onResponse)
            .then(json => {
                for(let i = 0; i < json.length; i++){
                    a = document.createElement('div');
                    a.classList.add('post');
                    document.querySelector('.right').appendChild(a);
                    b = document.createElement('div');
                    b.classList.add('titledata');
                    a.appendChild(b);
                    let c = document.createElement('div');
                    c.classList.add('thumbnail');
                    b.appendChild(c);
                    let d = document.createElement('img');
                    d.src = 'http://localhost:3001/download/' + json[i].pictures;
                    d.width = '150';
                    d.height = '90%';
                    d.alt = 'post';
                    c.appendChild(d);
                    c = document.createElement('div');
                    c.classList.add('para');    
                    b.appendChild(c);
                    d = document.createElement('p');
                    d.textContent = json[i].description;
                    c.appendChild(d);
                }
})
*/

// <h3>volunteered</h3>
//             <div class="volunteered">
//                 <div class="voldata">
//                     <div class="thumbnail">
//                         <img src="download (1).jpg" width="150" height="90%" alt="volenteerd">
//                     </div>
//                     <div class="para">
//                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsa, fugit
//                         velit at nam iste suscipit unde dolorem dolore quisquam sapiente ullam dicta perferendis
//                         voluptatibus sint. Fugit sapiente saepe voluptate!</p>
//                     </div>
//                 </div>
//             </div>

a = document.createElement('h3');
a.textContent = 'POST';
document.querySelector('.right').appendChild(a);

fetch(`http://localhost:3001/getUserVolunteered`)
            .then(onResponse)
            .then(json => {
            console.log(json)
            
                for(let i = 0; i < json.length; i++){
                    a = document.createElement('div');
                    a.className = 'volunteered';
                    document.querySelector('.right').appendChild(a);
                    b = document.createElement('div');
                    b.classList.add('voldata');
                    a.appendChild(b);
                    let c = document.createElement('div');
                    c.classList.add('thumbnail');
                    b.appendChild(c);
                    let d = document.createElement('img');
                    d.src = 'http://localhost:3001/download/' + json[i].pictures;
                    d.width = '150';
                    d.height = '90%';
                    d.alt = 'volenteerd';
                    c.appendChild(d);
                    c = document.createElement('div');
                    c.classList.add('para');
                    b.appendChild(c);
                    d = document.createElement('p');
                    d.textContent = json[i].description;
                    c.appendChild(d);
                    // <a class="upload" href="#">UPLOAD</a>
                    let e = document.createElement('a');
                    e.classList.add('upload');
                    e.href = '#';
                    e.textContent = 'UPLOAD';
                    a.appendChild(e);

                }
                
})

