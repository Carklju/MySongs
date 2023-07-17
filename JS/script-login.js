/*Button show password*/
let passwordShow = document.getElementById("showpass").addEventListener("click", ()=>{
    let password = document.getElementById("passwordtxt");
    if(password.type === "password"){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
});

/*Validation of login form*/
let login = document.querySelector(".login").addEventListener("click", ()=>{
    let username = document.getElementById("usertxt");
    let check = true;
    let password = document.getElementById("passwordtxt");

    if(username.value === ""){
        username.className = "error";
        check = false;
    }else{
        username.removeAttribute("class");
    }

    if(password.value === ""){
        password.className = "error";
        check = false;
    }else{
        username.removeAttribute("class");
    }

    if(password.value === localStorage.getItem("password") && username.value === localStorage.getItem("username")){
        window.location.href = "home.html"
    }
});