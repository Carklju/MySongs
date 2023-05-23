fetch("../songs.json")
  .then((response) => response.json())
  .then((data) => prikaziPesme(data));

function prikaziPesme(data) {
  let instrumenti = document.querySelectorAll(".instrument span");

  for (const item of instrumenti) {
    item.addEventListener("click", (e) => {
      let naslov = e.target.innerText;
      
      for (let song of data.songs) {
            console.log("radi");
            window.location.replace("../HTML/instrument.html");
            let listaPesama = document.querySelector(".song-list");
      }
      
    });
  }

  
}
