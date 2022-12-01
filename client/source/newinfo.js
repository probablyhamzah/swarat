function onResponse(response) {
    return response.json();
}
function getPosts() {
    fetch(`http://localhost:3001/posts`)
        .then(onResponse)
        .then(json => {
            console.log(json)
            let a = document.getElementById("post0")
            console.log(a);
            for (let i = 0; i < json.length; i++) {
                let b = document.createElement('div')
                b.classList.add('post_img');
                a.appendChild(b);

                let c = document.createElement('img')
                // c.classList.add("post_info");
                c.src = '/media/hamzah/HDD/Programs/acads/iwp/swarat/server/uploads/pic.png';
                b.appendChild(c);

                let e = document.createElement('div');
                e.classList.add('post_info');
                a.appendChild(e);

                let d = document.createElement('h1');
                d.textContent = json[i].location.lat + ' ' + json[i].location.lng;
                d.classList.add('post_title')
                e.appendChild(d);

                let f = document.createElement('p');
                f.classList.add('post_text')
                f.textContent = json[i].description;
                e.appendChild(f)

                let g = document.createElement('a');
                g.setAttribute('id', 'post_cta')
                g.classList.add('post_cta');
                g.href = '#';
                g.textContent = 'read more';
                g.addEventListener('click', function () {
                    document.querySelector('.bg-modal').style.display = 'flex';
                });
                e.appendChild(g);

                let h = document.getElementById('slideWrap');
                let m = document.createElement('li');
                let n = document.createElement('img');
                n.src = '/media/hamzah/HDD/Programs/acads/iwp/swarat/server/uploads/pic.png';
                console.log(n)
                m.appendChild(n);

                h.appendChild(m);

                let p = document.getElementById('box');
                let q = document.createElement('div');
                let r = document.createElement('p');
                r.textContent = json[i].description;
                q.classList.add('contentbox');
                p.appendChild(q);
                q.appendChild(r);

                let but = document.createElement('button');
                but.type = 'button';
                but.classList.add('submit');
                but.textContent = 'volunteer'
            }

        });
}
getPosts()
