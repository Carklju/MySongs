let email = document.getElementById("email");

/*Register validation*/
let passwordCheck = document.querySelector(".register").addEventListener("click", () => {
    let username = document.getElementById("usertxt");
    let email = document.getElementById("email");
    let password = document.getElementById("passwordtxt");
    let confirm = document.getElementById("confirmpasswordtxt");
    let check = true;

    if(username.value === ""){
        username.className = "error";
        check = false;
    }else{
        username.removeAttribute("class");
    }

    proveraEmail(email, check);
    proveraPassworda(password, confirm, check);

    if(check === true){
        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        window.location.href = "HTML/login.html";
    }
});

/*Function that checks the correctness of an email*/
function checkEmail(email, check){
    const mailFormat =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(email.value.match(mailFormat)){
        email.removeAttribute("class");
        return true;
    }else{
        check = false;
        email.className = "error";
        return false;
    }
}

/*Function that checks the correcntess of the password*/
function checkPassworda(password, confirm, check){
    if(password.value === ""){
        password.className = "error";
        confirm.className = "error"
        check = false;
    }
    else{
        if(password.value.length < 5){
            password.className = "error";
            confirm.className = "error"
            check = false;
        }else{
            if(password.value === confirm.value){
                password.removeAttribute("class");
                confirm.removeAttribute("class");
            }
            else{
                check = false;
            }
        }
    }
}

let alreadyReg = document.querySelector("#Already");

alreadyReg.addEventListener("click", () =>{
    window.location.href = "http://127.0.0.1:5500/HTML/login.html";
})
