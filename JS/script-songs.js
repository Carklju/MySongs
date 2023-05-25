fetch("../songs.json")
  .then((response) => response.json())
  .then((data) => prikaziPesme(data));

//Funkcija koja proverava koje je dugme odnosno instrument je selektovan
function prikaziPesme(data) {
  let instrumenti = document.querySelectorAll(".instrument span");
  for (const item of instrumenti) {
    item.addEventListener("click", (e) => {
      let naslov = e.target.innerText;
      if (naslov === "Bass Guitar") {
        ispis(data, naslov);
      } else if (naslov === "Guitar") {
        ispis(data, naslov);
      } else {
        ispis(data, naslov);
      }
    });
  }
}

//Funckija koja ispisuje listu pesama u zavisnosti koji je instrument selektovan
function ispis(data, naslov) {
  let filtrirano = data.songs.filter((song) => {
    return song.instrument === String(naslov);
  });
  let stranica = document.querySelector(".instruments");
  stranica.style.display = "none";
  for (let song of filtrirano) {
    let listaPesama = document.querySelector(".song-list");
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
    listaPesama.appendChild(novaPesma);
  }

  //Ispis detalja
  let detaljiStrelica = document.querySelectorAll(".more");
  let brojac = 0;
  let tacno = false;
  for (let strelica of detaljiStrelica) {
    console.log(brojac++);
    strelica.addEventListener("click", (e) => {
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

      

      //Funkcije za pustanje pesme u detaljima
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
            detaljiPesma.style.display = "none";
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

      document.addEventListener("keyup", (e) => {
        if (e.code === "Space") {
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
      });

      pesmaMp3.addEventListener("timeupdate", () => {
        progress.value = (pesmaMp3.currentTime / pesmaMp3.duration) * 100;
      });

      progress.addEventListener("change", () => {
        pesmaMp3.play();
        pesmaMp3.currentTime = progress.value;
        play.classList.remove("fa-play");
        play.classList.add("fa-pause");
      });
    });
  }
}
