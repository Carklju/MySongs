let statusDiv = document.querySelector(".status-wrap");
let instrumentDiv = document.querySelectorAll(".instrument");
let songWrap = document.querySelector(".song");
let statuses = document.querySelectorAll(".status");

for(const div of instrumentDiv){
    div.addEventListener("click", (e) =>{
        if(div.className === "selektovan"){
            div.className = "instrument"
            while(songWrap.hasChildNodes){
                songWrap.removeChild(songWrap.firstChild);
            }
        }else{
            div.className = "selektovan";
            let niz = JSON.parse(localStorage.getItem("Niz"));
                let naslov = e.target.innerText;
                if(naslov === "Guitar"){
                    let filterGitaraLocal = niz.filter((song) => {
                        return String(song.instrument) === "Guitar";
                    });
                let divSong = document.createElement("div");
                divSong.className = "songs";
                divSong.innerHTML = `
                <div class="name">
                  <p>${String(filterGitaraLocal.title)}</p>
                 <span>${String(filterGitaraLocal.artist)}</span>
                </div>`
                songWrap.append(divSong);
                }
                if(naslov === "Bass Guitar"){
                    let filterBassLocal = niz.filter((song) => {
                        return String(song.instrument) === "Bass Guitar";
                    });
                let divSong = document.createElement("div");
                divSong.className = "songs";
                divSong.innerHTML = `
                <div class="name">
                  <p>${String(filterBassLocal.title)}</p>
                 <span>${String(filterBassLocal.artist)}</span>
                </div>`
                songWrap.append(divSong);
                }
                if(naslov === "Drums"){
                    let filterDrumsLocal = niz.filter((song) => {
                        return String(song.instrument) === "Drums";
                    });
                let divSong = document.createElement("div");
                divSong.className = "songs";
                divSong.innerHTML = `
                <div class="name">
                  <p>${String(filterDrumsLocal.title)}</p>
                 <span>${String(filterDrumsLocal.artist)}</span>
                </div>`
                songWrap.append(divSong);
                }
        }
    })
}

for(const div of statuses){
    div.addEventListener("click", () =>{
        if(div.className === 'selektovano'){
            div.className = "status"
            while(songWrap.hasChildNodes){
                songWrap.removeChild(songWrap.firstChild);
            }
        }
    })
}

window.onscroll = function() {scroll()};

let best = document.querySelector(".best");
let header = document.querySelector(".navbar");
let strelica = document.querySelector("#StrelaGore");
let inst = document.querySelector(".instruments");
let back = document.querySelector(".back");
let fixed = header.offsetTop;

document.querySelector("#StrelaGore").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  document.querySelector(".login").addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  function scroll(){
    if(window.pageYOffset > fixed){
      header.classList.add("sticky");
      strelica.style.opacity = 1;
      strelica.style.visibility = "visible";
    }else{
      header.classList.remove("sticky");
      strelica.style.opacity = 0;
      strelica.style.visibility = "hidden";
    }
  }

  let hamburger = document.querySelector(".hamburger");
  let navigacija = document.querySelector(".navbar");
  let logo = document.querySelector(".logo")
  let navli = document.querySelector(".navUl");
  let login = document.querySelector(".login");
  
  hamburger.addEventListener("click", () =>{
    logo.classList.toggle("responsive");
    login.classList.toggle("responsive");
    navli.classList.toggle("responsive");
  })
