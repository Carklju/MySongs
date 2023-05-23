fetch("../songs.json")
  .then((response) => response.json())
  .then((data) => prikaziPesme(data));

function prikaziPesme(data) {
  let instrumenti = document.querySelectorAll(".instrument span");

  for (const item of instrumenti) {
    item.addEventListener("click", (e) => {
      let naslov = e.target.innerText;
      if (naslov === "Bass Guitar") {
        let filtriranoBass = data.songs.filter((song) => {
          return song.instrument === "Bass Guitar"; 
        });
        let stranica = document.querySelector(".instruments");
        stranica.style.display = "none";
        console.log(filtriranoBass);
        for (let song of filtriranoBass) {
          let listaPesama = document.querySelector  (".song-list");
          let novaPesma = document.createElement("li");
          novaPesma.className = "song";
          novaPesma.innerHTML = `<img src="../images/icon-01.png" alt=""}>
          <div class="name">
          <p>${song.artist}</p>
          <span>${song.title}</span>
        </div>`;
        console.log(novaPesma)
          listaPesama.appendChild(novaPesma);
        }
      }
    });
  }
}
