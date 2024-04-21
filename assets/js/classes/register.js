document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('user-name').value.trim();
        const fullName = document.getElementById('user-fullname').value.trim();
        const email = document.getElementById('user-email').value.trim();
        const password = document.getElementById('user-password').value;
        const confirmPassword = document.getElementById('user-confirm-password').value;
        const isAdmin = document.getElementById('isAdmin').checked;

        if (!isPasswordValid(password)) {
            alert("Password must be at least 5 characters long and contain at least one uppercase letter and one number.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (isUsernameTaken(username)) {
            alert("This username is already taken. Please choose another one.");
            return;
        }

        const user = {
            id: generateId(), 
            username,
            fullName,
            password,
            email,
            isAdmin
        };

        saveUser(user);

        Swal.fire({
            title: "Registration successful!",
            icon: "success",
            confirmButtonText: 'Login'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'login.html'; 
            }
        });
    });

    const navbarLinks = document.getElementById('navbarLinks');
    const isLoggedin = localStorage.getItem('isLoggedin');
    const isAdmin = localStorage.getItem('isAdmin');
    if(isAdmin){
        navbarLinks.innerHTML += '<li><a href="add.html" id="Add">Add</a></li>';
    }
    if (isLoggedin) {
        navbarLinks.innerHTML += `<li><a href="#">${localStorage.getItem('username')}</a></li>`;
        navbarLinks.innerHTML += '<li><a href="#" id="logout">Logout</a></li>';
    } else {
        navbarLinks.innerHTML += '<li><a href="login.html">Login</a></li>';
        navbarLinks.innerHTML += '<li><a href="register.html">Register</a></li>';
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }
});

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function isUsernameTaken(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    return passwordRegex.test(password);
}
