fetch("../songs.json")
  .then((response) => response.json())
  .then((data) => prikaziPesme(data));

function prikaziPesme(data) {
  let instrumenti = document.querySelectorAll(".instrument span");
  for (const item of instrumenti) {
    item.addEventListener("click", (e) => {
      let naslov = e.target.innerText;
      if (naslov === "Bass Guitar") {
        ispis(data, naslov);
      } else if (naslov === "Guitar") {
        ispis(data, naslov);
      } else{
        ispis(data, naslov);
      }
    });
  }
}

function ispis(data, naslov){
  let filtrirano = data.songs.filter((song) => {
    return song.instrument === String(naslov);
  });
  console.log(filtrirano);
  let stranica = document.querySelector(".instruments");
  stranica.style.display = "none";
  for (let song of filtrirano) {
    let listaPesama = document.querySelector(".song-list");
    let novaPesma = document.createElement("li");
    novaPesma.className = "song";
    novaPesma.innerHTML = `<img src="../images/${song.img}" alt=""}>
                                <div class="name">
                                  <p>${song.artist}</p>
                                 <span>${song.title}</span>
                                 <div class=more>
                                  <i class="material-icons">expand_more</i>
                                 </div>
                                </div>
                                `;
    listaPesama.appendChild(novaPesma);
    let detaljiPesma = document.createElement("div");
    detaljiPesma.className = "song-detail";
    detaljiPesma.innerHTML = `<div>
     <img src="../images/icon-01.png" alt="">
     </div>`;
    listaPesama.appendChild(detaljiPesma);
  }
}




