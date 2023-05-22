/* Dugme prikazi sifru u loginu*/
let passwordShow = document.getElementById("showpass").addEventListener("click", ()=>{
    let password = document.getElementById("passwordtxt");
    if(password.type === "password"){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
});

/* Validacija login forme*/
let login = document.querySelector(".login").addEventListener("click", ()=>{
    let username = document.getElementById("usertxt");
    let provera = true;
    let password = document.getElementById("passwordtxt");

    console.log("Provera");

    if(username.value === ""){
        username.className = "error";
        provera = false;
    }else{
        username.removeAttribute("class");
    }

    if(password.value === ""){
        password.className = "error";
        provera = false;
    }else{
        username.removeAttribute("class");
    }
});

//Dugme za povratak na home stranicu
document.querySelector(".back-btn").addEventListener("click", () =>{
    window.location.replace("../index.html");
});