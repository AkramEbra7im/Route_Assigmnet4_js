let signUserNameInput = document.getElementById('signUserName')
let signUserEmailInput = document.getElementById('signUserEmail')
let signUserPassInput = document.getElementById('signUserPass')
let logUserEmailInput = document.getElementById('logUserEmail')
let logUserPassInput = document.getElementById('logUserPass')
let signUpBtn = document.getElementById('signUpBtn')
let loginBtn = document.getElementById('loginBtn')
let charCheck = Array.from(document.querySelectorAll('.char i'))
let symbolCheck = Array.from(document.querySelectorAll('.symbol i'))
let numberCheck = Array.from(document.querySelectorAll('.number i'))
let upCaseCheck = Array.from(document.querySelectorAll('.upCase i'))
let loCaseCheck = Array.from(document.querySelectorAll('.loCase i'))
let NameCheck = Array.from(document.querySelectorAll('#vaildationName i'))
let vaildationPasswordInput = document.getElementById('vaildationPassword')
let vaildationNameInput = document.getElementById('vaildationName')
let VaildationEmailInput = document.getElementById('VaildationEmail')
let existEmail = document.getElementById('existEmail')

let usersList;
if (localStorage.getItem('users')) {
    usersList = JSON.parse(localStorage.getItem('users'))
}
else {
    usersList = []
}

function SignUp() {
    if (NameValidation() && emailValidation() && passValidation()) {
        let user = {
            name: signUserNameInput.value,
            email: signUserEmailInput.value.toLowerCase(),
            pass: signUserPassInput.value
        }
        usersList.push(user)
        localStorage.setItem('users', JSON.stringify(usersList))
        console.log(usersList)
        clearFrom()
        window.location.href = 'index.html'
    }

}

function NameValidation() {
    vaildationNameInput.classList.remove('d-none')
    let nameRegex = /^[a-zA-Z]{3,10}[a-zA-Z ]{0,20}$/;
    let nameTest = nameRegex.test(signUserNameInput.value);
    singleValidation(nameRegex, NameCheck, signUserNameInput.value)
    if (nameTest)
        vaildationNameInput.classList.add('d-none')
    return nameTest;
}

function emailValidation() {
    VaildationEmailInput.classList.remove('d-none')
    existEmail.classList.add('d-none')
    let emailRegex = /^[^\s@]+@[^\s@]{2,10}\.[^\s@]{2,10}$/;
    let emailTest = emailRegex.test(signUserEmailInput.value.toLowerCase());
    if (emailTest)
        VaildationEmailInput.classList.add('d-none')
    if (checkEmailExist()) {
        existEmail.classList.remove('d-none')
        existEmail.innerHTML = 'This Email Already Exist'
    }

    return emailTest && !checkEmailExist()
}

function passValidation() {
    vaildationPasswordInput.classList.remove('d-none')
    let passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    let passTest = passRegex.test(signUserPassInput.value);
    let coSymbol = /(?=.*[!@#$%^&*])/;
    let coNum = /(?=.*\d)/;
    let coLow = /(?=.*[a-z])/;
    let coUpp = /(?=.*[A-Z])/
    let con8char = /^.{8,20}$/
    singleValidation(coSymbol, symbolCheck, signUserPassInput.value)
    singleValidation(coNum, numberCheck, signUserPassInput.value)
    singleValidation(coLow, loCaseCheck, signUserPassInput.value)
    singleValidation(coUpp, upCaseCheck, signUserPassInput.value)
    singleValidation(con8char, charCheck, signUserPassInput.value)
    if (passTest)
        vaildationPasswordInput.classList.add('d-none')
    return passTest
}

function singleValidation(regex, list, input) {
    if (regex.test(input)) {
        list[0].classList.remove('d-none');
        list[1].classList.add('d-none')
        return true
    }
    else {
        list[0].classList.add('d-none');
        list[1].classList.remove('d-none')
        return false
    }
}

function checkEmailExist() {
    let check = false
    usersList.forEach(element => {
        if (element.email.toLowerCase() == signUserEmailInput.value.toLowerCase()){
            check = true
        }       
    });
    return check;
}

function clearFrom(){
    signUserNameInput.value = ''
    signUserEmailInput.value = ''
    signUserPassInput.value = ''
}


signUserNameInput.addEventListener('keyup', NameValidation)
signUserEmailInput.addEventListener('keyup', emailValidation)
signUserPassInput.addEventListener('keyup', passValidation)
signUpBtn.addEventListener('click', SignUp)


