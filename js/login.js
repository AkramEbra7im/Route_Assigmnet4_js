let logUserEmail = document.getElementById('logUserEmail')
let logUserPass = document.getElementById('logUserPass')
let loginBtn = document.getElementById('loginBtn')
let checkValidation = document.getElementById('checkValidation')

let usersList;
if (localStorage.getItem('users')) {
    usersList = JSON.parse(localStorage.getItem('users'))
}
else {
    usersList = []
}

function login() {
    let check = false
    usersList.forEach(element => {
        if (element.email.toLowerCase() == logUserEmail.value.toLowerCase() && element.pass == logUserPass.value) {
            localStorage.setItem('user', JSON.stringify(element))
            check = true
        }
    });
    if (check) {
        checkValidation.classList.add('d-none')
        clearForm()
        window.location.href = 'welcome.html'
    }
    else {
        checkValidation.classList.remove('d-none')
    }
}
function clearForm() {
    logUserEmail.value = ''
    logUserPass.value = ''
}

loginBtn.addEventListener('click', login)