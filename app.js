
const gitem = document.getElementsByClassName("gitem");
gitem[0].setAttribute("style", "background-color: #d9e7f3;")
gitem[3].setAttribute("style", "background-color: #d9e7f3;")
gitem[4].setAttribute("style", "background-color: #d9e7f3;")

gitem[1].setAttribute("style", "background-color: #fffaf1;")
gitem[2].setAttribute("style", "background-color: #fffaf1;")
gitem[5].setAttribute("style", "background-color: #fffaf1;")

/////////////////
const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7377cd271bmsh61f1b05a7be44bcp1bbeb5jsn061d9e87947a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};


async function makeRequest(){
    let req = await fetch(url, options);
    let res = await req.json()
    console.log(res.data.slice(0, 6))
    let currentIndex;
    let num = 1;
        res.data.forEach(item => {
                let div = document.createElement("div");
                div.className = "songss";
                let mins = Math.floor((item.duration / 60));
                let secs = (item.duration - (mins*60));
                if (secs<10) {
                    secs = "0"+secs
                }

                div.innerHTML = `
                <span id="index"> ${num} </span>
                <span class="spic" style="background:url(${item.album.cover})"></span>
                <div class="Sname"><span>${item.title}</span> <br>${item.artist.name}</div>
                <span class="time">${mins}:${secs}</span>
                <span class="playbuttonS" id = "${item.title}"><i class="fa-solid fa-play"></i></span>
                <span class="toPlaylist"><i class="fa-solid fa-square-plus"></i></span>
                `
                document.querySelector(".songBox").append(div)
                num++;
        });

        document.querySelectorAll(".playbuttonS").forEach(item => {
            item.onclick = function() {
                res.data.forEach(data => {
                    if (item.id == data.title) {
                        document.querySelector(".nowPlaying .picture").style = `background-image: url("${data.album.cover}");`
                        document.querySelector(".nowPlaying h1").innerHTML = data.title;
                        document.querySelector(".nowPlaying h3").innerHTML = data.artist.name;
                        document.querySelector("audio").setAttribute('src', data.preview)
                        document.querySelector("audio").play()
                        document.querySelector(".Play i").classList.replace("fa-play", "fa-pause");
                    }
                });
            }
        });

        document.querySelector(".Play").onclick = () => {
            if (document.querySelector(".Play i").classList.contains("fa-play")) {
                document.querySelector("audio").play()
                document.querySelector(".Play i").classList.replace("fa-play", "fa-pause");
            } else {
                document.querySelector("audio").pause()
                document.querySelector(".Play i").classList.replace("fa-pause", "fa-play");
            }
        }
}

 makeRequest()

 if (window.innerWidth <= 700) {
    let slide;
    let hbMenu = document.createElement('div')
    hbMenu.classList.add("hbMenu")
    hbMenu.innerHTML = '<i class="fa-solid fa-bars" style = "font-size: 20px;"></i>'
    console.log("done")
    document.querySelector('body').append(hbMenu)


    hbMenu.onclick = () => {
        if (!slide) {
            document.querySelector('aside').style.display = 'grid'
            document.querySelector('main').style.display = 'none'
            slide = !slide;
        }
        else{
            document.querySelector('aside').style.display = 'none'
            document.querySelector('main').style.display = 'block'
            slide = !slide;
        }   

    }
 }

 