let userName = document.getElementById('userName')
let user = JSON.parse(localStorage.getItem('user'))


userName.innerHTML = `Welcome ${user.name}`

