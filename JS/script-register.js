/*Validacija registracije*/
let email = document.getElementById("email");

let passwordProvera = document.querySelector(".register").addEventListener("click", () => {
    let username = document.getElementById("usertxt");
    let email = document.getElementById("email");
    let password = document.getElementById("passwordtxt");
    let confirm = document.getElementById("confirmpasswordtxt");
    let provera = true;

    if(username.value === ""){
        username.className = "error";
        provera = false;
    }else{
        username.removeAttribute("class");
    }

    proveraEmail(email, provera);

    proveraPassworda(password, confirm, provera);

});

/*Funkcija koja proverava da li je mejl ispravan*/
function proveraEmail(email, provera){
    const mailformat =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(email.value.match(mailformat)){
        email.removeAttribute("class");
        return true;
    }else{
        provera = false;
        email.className = "error";
        return false;
    }
}

/*Funkcija koja proverava da li je sifra ispravna*/
function proveraPassworda(password, confirm, provera){
    if(password.value === ""){
        password.className = "error";
        confirm.className = "error"
        provera = false;
    }
    else{
        if(password.value.length < 5){
            password.className = "error";
            confirm.className = "error"
            provera = false;
        }else{
            if(password.value === confirm.value){
                password.removeAttribute("class");
                confirm.removeAttribute("class");
            }
            else{
                provera = false;
            }
        }
    }
}