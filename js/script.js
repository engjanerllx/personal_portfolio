document.addEventListener('DOMContentLoaded', () => {
    // --- Registration ---
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const registrationError = document.getElementById('registrationError');

            if (password !== confirmPassword) {
                registrationError.textContent = 'Passwords do not match.';
                registrationError.classList.remove('d-none');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.username === username || user.email === email)) {
                registrationError.textContent = 'Username or email already exists.';
                registrationError.classList.remove('d-none');
                return;
            }

            const newUser = { username, email, password }; 
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';  
        });
    }

    // --- Login ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const loginUsernameEmail = document.getElementById('loginUsernameEmail').value.trim();
            const loginPassword = document.getElementById('loginPassword').value;
            const loginError = document.getElementById('loginError');

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => 
                (user.username === loginUsernameEmail || user.email === loginUsernameEmail) && 
                user.password === loginPassword
            );

            if (user) {
                localStorage.setItem('loggedInUser', user.username);
                window.location.href = 'index.html';  
                loginError.textContent = 'Already logged In.';
                loginError.classList.remove('d-none');
            }
        });
    }

    // --- Logout ---
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }

    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            usernameDisplay.textContent = `Welcome, ${loggedInUser}!`;
        }
    }
});