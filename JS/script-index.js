fetch("../songs.json")
  .then((response) => response.json())
  .then((data) => fetchData(data));

function fetchData(data) {
  let bestSongs = document.querySelectorAll(".best-songs");

  for (let pesma of bestSongs) {
    /*If song is for bass guitar and is recommended show it on page*/
    if (pesma.classList.contains("bass-guitar")) {
      let filterBas = data.songs.filter((song) => {
        return song.recommended === "Yes" && song.instrument === "Bass Guitar";
      });
      for (let fil of filterBas) {
        let songg = document.createElement("div");
        songg.className = "best-song";
        songg.innerHTML = `<img src="../images/${fil.img}" alt="">
        <h3>${fil.artist}</h3>
        <h4>${fil.title}</h4>
        <span class="details">Details</span>`;
        pesma.appendChild(songg);
      }
    }
    /*If song is for guitar and is recommended show it on page*/
    if (pesma.classList.contains("guitar")) {
      let filterGuitar = data.songs.filter((song) => {
        return song.recommended === "Yes" && song.instrument === "Guitar";
      });
      for (let fil of filterGuitar) {
        let songg = document.createElement("div");
        songg.className = "best-song";
        songg.innerHTML = `<img src="../images/${fil.img}" alt="">
        <h3>${fil.artist}</h3>
        <h4>${fil.title}</h4>
        <span class="details" >Details</span>`;
        pesma.appendChild(songg);
      }
    }
    /*If song is for drums and is recommended show it on page*/
    if (pesma.classList.contains("drums")) {
      let filterDrums = data.songs.filter((song) => {
        return song.recommended === "Yes" && song.instrument === "Drums";
      });

      for (let fil of filterDrums) {
        let songg = document.createElement("div");
        songg.className = "best-song";
        songg.innerHTML = `<img src="../images/${fil.img}" alt="">
        <h3>${fil.artist}</h3>
        <h4>${fil.title}</h4>
        <span class="details">Details</span>`;
        pesma.appendChild(songg);
      }
    }
  }
  /*Clicking on detail arrow displays details of that particular song*/
  let detalji = document.querySelectorAll(".details");
  for (let det of detalji) {
    det.addEventListener("click", (e) => {
      let detaljiWrap = document.querySelector(".details-wrapper");
      let blurPozadina = document.getElementById("main-wrapper");
      let naslov = e.target.parentElement.children[2].innerText;
      let filterPesme = data.songs.filter((song) => {
        return song.title === naslov;
      });
      let detaljiPesma = document.createElement("div");
      detaljiPesma.className = "details-inner";
      detaljiPesma.innerHTML = `<img src="../images/${filterPesme[0].img}" alt="">
            <div class="details-info">
                <p><span>Title: </span>${filterPesme[0].title}</p>
                <p><span>Artist: </span>${filterPesme[0].artist}</p>
                <p><span>Album: </span>${filterPesme[0].album}</p>
                <p><span>Release Date: </span>${filterPesme[0].releaseDate}</p>
                <p><span>Duration: </span>${filterPesme[0].duration}</p>
                <p><span>Genre: </span>${filterPesme[0].genre}</p>
                <p><span>Language: </span>${filterPesme[0].language}</p>
                <select name="option" id="Learning">
                  <option value="" selected>Select...</option>
                  <option value=learned>Learned</option>
                  <option value=currently>Currently Learning</option>
                  <option value=droped>Droped Learning</option>
                  <option value=plan>Plan To Learn</option>
                  </select>
                <audio id="audioMp3">
                  <source src="../media/${filterPesme[0].mp3}"
                  type="audio/mpeg">
                </audio>
                <input type="range" value="0" class="prog" id="progress">
                <div class="controls">
                  <div><i class="fa-solid fa-play" id="dugmePlay"></i></div>
                </div>
            </div>
            <div class="exit">
              <span class="material-symbols-outlined">
                cancel
                </span>
            </div>`;
      strelica.style.display = "none";
      detaljiWrap.appendChild(detaljiPesma);
      blurPozadina.className = "blur";
      detaljiPesma.style.visibility = "visible";
      detaljiPesma.scrollIntoView();

      let progress = document.getElementById("progress");
      let pesmaMp3 = document.querySelector("#audioMp3");
      let play = document.getElementById("dugmePlay");

      let exitBtn = document.querySelectorAll(".exit");
      for (let exit of exitBtn) {
        exit.addEventListener("click", () => {
          strelica.style.display = "";
          pesmaMp3.pause();
          detaljiPesma.remove();
          blurPozadina.className = "";
        });
      }
      /*Event listeners related to playing songs*/
      pesmaMp3.addEventListener("onloadedmetadata", (e) => {
        progress.max = pesmaMp3.duration;
        progress.value = pesmaMp3.currentTime;
      });

      window.addEventListener("load", () => {
        pesmaMp3.pause();
      });

      play.addEventListener("click", () => {
        if (play.classList.contains("fa-pause")) {
          pesmaMp3.pause();
          play.classList.remove("fa-pause");
          play.classList.add("fa-play");
        } else {
          pesmaMp3.play();
          play.classList.remove("fa-play");
          play.classList.add("fa-pause");
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          e.preventDefault();
          pesmaMp3.pause();
          if (play.classList.contains("fa-pause")) {
            pesmaMp3.pause();
            play.classList.remove("fa-pause");
            play.classList.add("fa-play");
          } else {
            pesmaMp3.play();
            play.classList.remove("fa-play");
            play.classList.add("fa-pause");
          }
        }
        if (e.code === "ArrowRight") {
          if (play.classList.contains("fa-pause")) {
            pesmaMp3.currentTime += 10;
          }
        }

        if (e.code === "ArrowLeft") {
          if (play.classList.contains("fa-pause")) {
            pesmaMp3.currentTime -= 10;
          }
        }
      });

      pesmaMp3.addEventListener("timeupdate", () => {
        progress.value = (pesmaMp3.currentTime / pesmaMp3.duration) * 100;
      });

      progress.addEventListener("change", () => {
        pesmaMp3.play();
        progress.value = (pesmaMp3.currentTime / pesmaMp3.duration) * 100;
        pesmaMp3.currentTime = progress.value;
        play.classList.remove("fa-play");
        play.classList.add("fa-pause");
      });
    });
  }
  //---------------------------------------------------------
  /*Writing details for songs when they are all displayed (after click on See All)*/
  function ispisDetalja(data){
    let detaljiStrelica = document.querySelectorAll(".more");
    for (let strelica of detaljiStrelica) {
      strelica.addEventListener("click", function funckija(e) {
        let detaljiPesma = document.createElement("div");
        let imePesme = e.target.parentElement.parentElement.children[1].innerHTML;
        let filtriranaPesma = data.songs.filter((song) => {
          return song.title === String(imePesme);
        });
        let pesma = e.target.parentElement.parentElement.parentElement;
        detaljiPesma.className = "song-detail";
        detaljiPesma.innerHTML = `
       <img src="../images/${filtriranaPesma[0].img}" alt="">
       <div class="song-details-info">
            <p><span>Title: </span>${filtriranaPesma[0].title}</p>
            <p><span>Artist: </span>${filtriranaPesma[0].artist}</p>
            <p><span>Album: </span>${filtriranaPesma[0].album}</p>
            <p><span>Release Date: </span>${filtriranaPesma[0].releaseDate}</p>
            <p><span>Duration: </span>${filtriranaPesma[0].duration}</p>
            <p><span>Genre: </span>${filtriranaPesma[0].genre}</p>
            <p><span>Language: </span>${filtriranaPesma[0].language}</p>
            <select name="option" id="Learning">
                    <option value="" selected>Select...</option>
                    <option value=learned>Learned</option>
                    <option value=currently>Currently Learning</option>
                    <option value=droped>Droped Learning</option>
                    <option value=plan>Plan To Learn</option>
                    </select>
            <audio id="audioMp3${Array.prototype.indexOf.call(
              detaljiStrelica,
              strelica
            )}">
              <source src="../media/${filtriranaPesma[0].mp3}"
              type="audio/mpeg">
            </audio>
            <input type="range" value="0" class="prog" id="progress${Array.prototype.indexOf.call(
              detaljiStrelica,
              strelica
            )}">
            <div class="controls">
              <div><i class="fa-solid fa-play" id="dugmePlay${Array.prototype.indexOf.call(
                detaljiStrelica,
                strelica
              )}"></i></div>
            </div>
            <div class="show-less">
            <i id="StrelicaGore${Array.prototype.indexOf.call(
              detaljiStrelica,
              strelica
            )}" class="material-icons strelica">expand_more</i>
          </div>
        </div>
       `;
        pesma.style.display = "none";
        pesma.after(detaljiPesma);
  
        /*Event listeners related to playing songs*/
        let progress = document.getElementById(
          "progress" + Array.prototype.indexOf.call(detaljiStrelica, strelica)
        );
        let pesmaMp3 = document.querySelector(
          "#audioMp3" + Array.prototype.indexOf.call(detaljiStrelica, strelica)
        );
        let play = document.getElementById(
          "dugmePlay" + Array.prototype.indexOf.call(detaljiStrelica, strelica)
        );
  
        let StrelicaGore = document
          .getElementById(
            "StrelicaGore" +
              Array.prototype.indexOf.call(detaljiStrelica, strelica)
          )
          .addEventListener("click", (e) => {
            if ((pesma.style.display = "none")) {
              pesma.style.display = "";
              detaljiPesma.remove();
              pesmaMp3.pause();
            }
          });
  
        pesmaMp3.addEventListener("onloadedmetadata", (e) => {
          progress.max = pesmaMp3.duration;
          progress.value = pesmaMp3.currentTime;
        });
  
        window.addEventListener("load", () => {
          pesmaMp3.pause();
        });
  
        play.addEventListener("click", () => {
          if (play.classList.contains("fa-pause")) {
            pesmaMp3.pause();
            play.classList.remove("fa-pause");
            play.classList.add("fa-play");
          } else {
            pesmaMp3.play();
            play.classList.remove("fa-play");
            play.classList.add("fa-pause");
          }
        });
  
        document.addEventListener("keydown", (e) => {
          if (e.code === "Space") {
            e.preventDefault();
            pesmaMp3.pause();
            if (play.classList.contains("fa-pause")) {
              pesmaMp3.pause();
              play.classList.remove("fa-pause");
              play.classList.add("fa-play");
            } else {
              pesmaMp3.play();
              play.classList.remove("fa-play");
              play.classList.add("fa-pause");
            }
          }
          if (e.code === "ArrowRight") {
            if (play.classList.contains("fa-pause")) {
              pesmaMp3.currentTime += 10;
            }
          }
  
          if (e.code === "ArrowLeft") {
            if (play.classList.contains("fa-pause")) {
              pesmaMp3.currentTime -= 10;
            }
          }
        });
  
        pesmaMp3.addEventListener("timeupdate", () => {
          progress.value = (pesmaMp3.currentTime / pesmaMp3.duration) * 100;
        });
  
        progress.addEventListener("change", () => {
          pesmaMp3.play();
          progress.value = (pesmaMp3.currentTime / pesmaMp3.duration) * 100;
          pesmaMp3.currentTime = progress.value;
          play.classList.remove("fa-play");
          play.classList.add("fa-pause");
        });
      });
      }
    }

  
  //---------------------------------------------------------

  /*Showing all song when click on See All */
  let seeAll = document.querySelectorAll(".seeAll");
  for (let see of seeAll) {
    see.addEventListener("click", (e) => {
      let naslov = e.target.previousElementSibling;
      let bestWrap = document.querySelector(".best");
      let listaPesama = document.createElement("ul");
      listaPesama.className = "song-list";
      if (naslov.classList.contains("guitar")) {
        let filterGitara = data.songs.filter((song) => {
          return song.instrument === "Guitar";
        });
        for (let song of filterGitara) {
          let novaPesma = document.createElement("li");
          novaPesma.className = "song";
          novaPesma.innerHTML = `
                              <img src="../images/${song.img}" alt=""}>
                                <div class="name">
                                  <p>${song.artist}</p>
                                 <span>${song.title}</span>
                                 <div class=more>
                                  <i class="material-icons">expand_more</i>
                                 </div>
                                </div>
                                `;
          bestWrap.after(listaPesama);
          bestWrap.style.display = "none";
          listaPesama.appendChild(novaPesma);
        }
    }else if(naslov.classList.contains("bass")){
        let filterBas = data.songs.filter((song) =>{
            return song.instrument === "Bass Guitar"
        });
        for (let song of filterBas) {
            let novaPesma = document.createElement("li");
            novaPesma.className = "song";
            novaPesma.innerHTML = `
                                <img src="../images/${song.img}" alt=""}>
                                  <div class="name">
                                    <p>${song.artist}</p>
                                   <span>${song.title}</span>
                                   <div class=more>
                                    <i class="material-icons">expand_more</i>
                                   </div>
                                  </div>
                                  `;
            bestWrap.after(listaPesama);
            bestWrap.style.display = "none";
            listaPesama.appendChild(novaPesma);
      }
    }else if(naslov.classList.contains("drums")){
        let filterBubnjevi = data.songs.filter((song) =>{
            return song.instrument === "Drums"
        });
        for (let song of filterBubnjevi) {
            let novaPesma = document.createElement("li");
            novaPesma.className = "song";
            novaPesma.innerHTML = `
                                <img src="../images/${song.img}" alt=""}>
                                  <div class="name">
                                    <p>${song.artist}</p>
                                   <span>${song.title}</span>
                                   <div class=more>
                                    <i class="material-icons">expand_more</i>
                                   </div>
                                  </div>
                                  `;
            bestWrap.after(listaPesama);
            bestWrap.style.display = "none";
            listaPesama.appendChild(novaPesma);
      }
    }
    ispisDetalja(data);
  });
  }
}

document.querySelector("#StrelaGore").addEventListener("click", () =>{
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
});


window.onscroll = function() {scroll()};

let best = document.querySelector(".best");
let header = document.querySelector(".navbar");
let strelica = document.querySelector("#StrelaGore");
let inst = document.querySelector(".instruments");
let back = document.querySelector(".back");
let fixed = header.offsetTop;

function scroll(){
  if(window.pageYOffset > fixed){
    header.classList.add("sticky");
    strelica.style.opacity = 1;
    strelica.style.visibility = "visible";
    if(window.location.href === "http://127.0.0.1:5500/HTML/home.html"){
    best.style.marginTop = "140px";
    }
    if(window.location.href === "http://127.0.0.1:5500/HTML/songs.html"){
    inst.style.marginTop = "220px";
    }
  }else{
    header.classList.remove("sticky");
    strelica.style.opacity = 0;
    strelica.style.visibility = "hidden";
    if(window.location.href === "http://127.0.0.1:5500/HTML/home.html"){
      best.style.marginTop = "40px";
      }
    if(window.location.href === "http://127.0.0.1:5500/HTML/songs.html"){
        inst.style.marginTop = "120px";
      }
  }
}

let username = localStorage.getItem("username");
let welcome = document.querySelector(".welcome");

welcome.append(username);

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

document.querySelector(".login").addEventListener("click", () => {
  window.location.href = "profile.html";
});
