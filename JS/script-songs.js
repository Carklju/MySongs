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
  //---------------------------------------------------------------------
  let detaljiStrelica = document.querySelectorAll(".more");
  for (let strelica of detaljiStrelica) {
      strelica.addEventListener("click", (e) => {
      let detaljiPesma = document.createElement("div");
      let imePesme = e.target.parentElement.parentElement.children[1].innerHTML;
      let filtriranaPesma = data.songs.filter((song) => {
        return song.title === String(imePesme);
      });
      console.log(String(filtriranaPesma[0].title));
      let pesma = e.target.parentElement.parentElement.parentElement;
      detaljiPesma.className = "song-detail";
      detaljiPesma.innerHTML = `<div>
     <img src="../images/${filtriranaPesma[0].img}" alt="">
     </div>`;
      pesma.style.display = "none";
      pesma.after(detaljiPesma);
    });
  }
}

//Funkcije za pustanje pesme u detaljima
let progress = document.getElementById("progress");
let pesmaMp3 = document.getElementById("audioMp3");
let play = document.getElementById("dugmePlay");

pesmaMp3.addEventListener("onloadedmetadata", () => {
  progress.max = pesmaMp3.duration;
  progress.value = pesmaMp3.currentTime;
});

window.addEventListener("load", () =>{
  pesmaMp3.pause();
});

play.addEventListener("click", () =>{
  if(play.classList.contains("fa-pause")){
    pesmaMp3.pause();
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  }else{
    pesmaMp3.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  }
});

document.addEventListener("keyup", (e) =>{
  if(e.code === "Space"){
    if(play.classList.contains("fa-pause")){
      pesmaMp3.pause();
      play.classList.remove("fa-pause");
      play.classList.add("fa-play");
    }else{
      pesmaMp3.play();
      play.classList.remove("fa-play");
      play.classList.add("fa-pause");
    }
  }
})

// if(pesmaMp3.play()){
//   setInterval(()=>{
     //progress.max = pesmaMp3.duration;
//     progress.value = pesmaMp3.currentTime;
   //currentTime.innerHTML = formatTime(pesmaMp3.currentTime);
//   }, 1500);
// }

pesmaMp3.addEventListener("timeupdate", () =>{
  progress.value = pesmaMp3.currentTime / pesmaMp3.duration * 100;
})

progress.addEventListener("change", ()=>{
  pesmaMp3.play();
  pesmaMp3.currentTime = progress.value;
  play.classList.remove("fa-play");
  play.classList.add("fa-pause");
});



