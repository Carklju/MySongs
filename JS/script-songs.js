fetch("../songs.json")
  .then((response) => response.json())
  .then((data) => prikaziPesme(data));

//Function that checks which instrument is selected
function prikaziPesme(data) {
  let filterDiv = document.querySelector(".filter");
  let instrumenti = document.querySelectorAll(".instrument span");
  let navbar = document.querySelector(".navbar");
  for (const item of instrumenti) {
    item.addEventListener("click", (e) => {
      let back = document.createElement("div");
      back.className = "back";
      back.innerHTML = `<span>Back</span>`;
      navbar.after(back);
      let naslov = e.target.innerText;
      if (naslov === "Bass Guitar") {
        ispis(data, naslov);
      } else if (naslov === "Guitar") {
        ispis(data, naslov);
      } else {
        ispis(data, naslov);
      }
      filterDiv.style.display = "block";
    });
  }
  ispisZanrova(data);
}

let nizLocalStorage = [];
let privNiz = [];
let nizNovi = [];

//Function that shows a list of songs depending on which instrument is selected
function ispis(data, naslov) {
  let filterDiv = document.querySelector(".filter");
  let filtrirano = data.songs.filter((song) => {
    return song.instrument === String(naslov);
  });
  let stranica = document.querySelector(".instruments");
  stranica.style.display = "none";
  let listaPesama = document.querySelector(".song-list");
  listaPesama.innerHTML = "";
  for (let song of filtrirano) {
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
    let back = document.querySelector(".back");
    document.getElementsByClassName("song-list")[0].style.display = "";
    back.addEventListener("click", () => {
      stranica.style.display = "";
      listaPesama.style.display = "none";
      back.style.display = "none";
      filterDiv.style.display = "none";
    });
  }

  /*Writing details for songs*/
  function ispisDetalja(data) {
    let detaljiStrelica = document.querySelectorAll(".more");
    for (let strelica of detaljiStrelica) {
      strelica.addEventListener("click", function funckija(e) {
        let detaljiPesma = document.createElement("div");
        let imePesme =
          e.target.parentElement.parentElement.children[1].innerHTML;
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
          <select name="option" id="Learning${Array.prototype.indexOf.call(
            detaljiStrelica,
            strelica
          )}">
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

        let select = document.getElementById(
          "Learning" + Array.prototype.indexOf.call(detaljiStrelica, strelica)
        );

        select.addEventListener("change", (e) => {
          let value = e.target.value;

          if (privNiz.length > 0) {
            for (const loc of privNiz) {
              if (loc.title === filtriranaPesma[0].title) {
                loc.status = value;
                privNiz = JSON.parse(localStorage.getItem("Niz"));
                privNiz.filter((data) => {
                  data.title !== loc.title;
                });
                localStorage.setItem("Niz", JSON.stringify(privNiz));
              } else {
                filtriranaPesma[0].status = value;
                privNiz.push(filtriranaPesma[0]);
                localStorage.setItem("Niz", JSON.stringify(privNiz));
              }
            }
          } else {
            filtriranaPesma[0].status = value;
            privNiz.push(filtriranaPesma[0]);
            localStorage.setItem("Niz", JSON.stringify(privNiz));
          }
        });

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
  ispisDetalja(data);

  /*Filtering songs*/
  let filter = document.querySelector(".filter");
  let filterHeader = document.querySelector(".filter-header");
  let filterInner = document.querySelector(".filter-inner");
  filterHeader.addEventListener("click", () => {
    filter.classList.toggle("show");
    filterInner.classList.toggle("show");
  });

  let titleInput = document.querySelector("#title");
  let artistInput = document.querySelector("#artist");
  let albumInput = document.querySelector("#album");
  let genreInput = document.querySelector("#Genre");
  let min = document.querySelector("#minYear");
  let max = document.querySelector("#maxYear");
  let search = document.getElementById("searchFilter");

  search.addEventListener("click", () => {
    let titleFilter = titleInput.value.toLowerCase();
    let artistFilter = artistInput.value.toLowerCase();
    let albumFilter = albumInput.value.toLowerCase();
    let genreFilter = genreInput.value;
    let minFilter = min.value;
    let maxFilter = max.value;
    let listaPesamaFilter = document.querySelector(".song-list");
    let pesma = document.getElementsByClassName("song");
    let detaljiFilter = document.getElementsByClassName("song-detail");

    listaPesamaFilter.innerHTML = ``;
    for (let i of filtrirano) {
      let title = i.title.toLowerCase();
      let artist = i.artist.toLowerCase();
      let album = i.album.toLowerCase();
      let genre = i.genre;
      let year = i.releaseDate;

      if (
        (title.includes(titleFilter) || titleFilter === "") &&
        (artist.includes(artistFilter) || artistFilter === "") &&
        (album.includes(albumFilter) || albumFilter === "") &&
        (genre.includes(genreFilter) || genreFilter === "") &&
        minFilter < year &&
        year < maxFilter
      ) {
        let novaPesmaFilter = document.createElement("li");
        novaPesmaFilter.className = "song";
        novaPesmaFilter.innerHTML = `
                              <img src="../images/${i.img}" alt=""}>
                                <div class="name">
                                  <p>${i.artist}</p>
                                 <span>${i.title}</span>
                                 <div class=more>
                                  <i class="material-icons">expand_more</i>
                                 </div>
                                </div>
                                `;
        listaPesamaFilter.append(novaPesmaFilter);
      }
    }
    if (listaPesamaFilter.childElementCount === 0) {
      alert("There is not song that meets your criteria");
    }
    ispisDetalja(data);
  });
  /*Song sorting*/
  let sortuj = document.querySelector("#Sort");
  sortuj.addEventListener("change", (e) => {
    const selected = sortuj.value;
    let songlistDiv = document.querySelector(".song-list");
    songlistDiv.innerHTML = ``;
    if (selected === "title") {
      const niz = Array.from(filtrirano);
      niz.sort((a, b) => {
        if (String(a.title) > String(b.title)) {
          return -1;
        } else {
          return 1;
        }
      });
      for(const el of niz){
        let novaPesmaFilter = document.createElement("li");
        novaPesmaFilter.className = "song";
        novaPesmaFilter.innerHTML = `
                              <img src="../images/${el.img}" alt=""}>
                                <div class="name">
                                  <p>${el.artist}</p>
                                 <span>${el.title}</span>
                                 <div class=more>
                                  <i class="material-icons">expand_more</i>
                                 </div>
                                </div>
                                `;
        songlistDiv.append(novaPesmaFilter);
      }
    }
    if(selected === "artist"){
      const niz = Array.from(filtrirano);
      niz.sort((a, b) => {
        if (String(a.artist) > String(b.artist)) {
          return -1;
        } else {
          return 1;
        }
      });
      for(const el of niz){
        let novaPesmaFilter = document.createElement("li");
        novaPesmaFilter.className = "song";
        novaPesmaFilter.innerHTML = `
                              <img src="../images/${el.img}" alt=""}>
                                <div class="name">
                                  <p>${el.artist}</p>
                                 <span>${el.title}</span>
                                 <div class=more>
                                  <i class="material-icons">expand_more</i>
                                 </div>
                                </div>
                                `;
        songlistDiv.append(novaPesmaFilter);
      }
    }
    if(selected === "year"){
      const niz = Array.from(filtrirano);
      niz.sort((a, b) => {
          return parseInt(a.releaseDate)-parseInt(b.releaseDate);
      });
      for(const el of niz){
        let novaPesmaFilter = document.createElement("li");
        novaPesmaFilter.className = "song";
        novaPesmaFilter.innerHTML = `
                              <img src="../images/${el.img}" alt=""}>
                                <div class="name">
                                  <p>${el.artist}</p>
                                 <span>${el.title}</span>
                                 <div class=more>
                                  <i class="material-icons">expand_more</i>
                                 </div>
                                </div>
                                `;
        songlistDiv.append(novaPesmaFilter);
      }
    }
  });
}

document.querySelector(".login").addEventListener("click", () => {
  window.location.href = "profile.html";
});

document.querySelector("#StrelaGore").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
/*Function that places all genres in one array and prints it out in genre select*/
function ispisZanrova(data) {
  let genres = document.getElementById("Genre");
  let zanroviSvi = [];

  for (let genre of data.songs) {
    if (!zanroviSvi.includes(genre.genre)) {
      zanroviSvi.push(genre.genre);
    }
  }
  zanroviSvi.forEach((genre) => {
    let genreSelect = document.createElement("option");
    genreSelect.text = genre;
    genreSelect.value = genre;
    genres.append(genreSelect);
  });
}

let numberYearMin = document.querySelector("#NumberMinYear");
let numberYearMax = document.querySelector("#NumberMaxYear");
let maxYear = document.querySelector("#maxYear");
let minYear = document.querySelector("#minYear");

window.addEventListener("load", () => {
  numberYearMax.innerText = "2023";
  numberYearMin.innerText = "1950";
  maxYear.value = 2023;
  minYear.value = 1950;
});

maxYear.addEventListener("change", () => {
  numberYearMax.innerText = maxYear.value;
});

minYear.addEventListener("change", () => {
  numberYearMin.innerText = minYear.value;
});
