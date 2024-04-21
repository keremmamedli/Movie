document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('user-name').value.trim();
        const password = document.getElementById('user-password').value;

        const users = getUsersFromLocalStorage();
        const user = users.find(user => user.username === username && user.password === password);
        
        if (user) {
            localStorage.setItem('isLoggedin', true);
            localStorage.setItem('username', username);
            localStorage.setItem('isAdmin', user.isAdmin === 'true');
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password.');
        }
    });
});

function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem('users');
    return JSON.parse(usersJSON) || [];
}
