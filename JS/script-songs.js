

let instrumenti = document.querySelectorAll(".instrument span");

for(const item of instrumenti){
        item.addEventListener("click", (e) =>{
            let naslov = e.target.innerText;
            console.log(naslov);
        })
    }

