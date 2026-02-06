async function register(username, email, password) {
    try {
        const data = await apiRequest('/auth/register', 'POST', { username, email, password });
        
        localStorage.setItem('token', data.token);
        
        alert('Registration successful!');
        window.location.href = 'profile.html';
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
}

async function login(email, password) {
    try {
        const data = await apiRequest('/auth/login', 'POST', { email, password });
        
        localStorage.setItem('token', data.token);
        
        alert('Login successful!');
        window.location.href = 'profile.html';
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

async function loadProfile() {
    try {
        const userData = await apiRequest('/users/me', 'GET');
        
        const nameElement = document.getElementById('userName');
        const emailElement = document.getElementById('userEmail');
        
        if (nameElement) nameElement.textContent = userData.username;
        if (emailElement) emailElement.textContent = userData.email;
    } catch (error) {
        console.error('Profile load error:', error);
        logout(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            register(e.target.username.value, e.target.email.value, e.target.password.value);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            login(e.target.email.value, e.target.password.value);
        });
    }

    if (window.location.pathname.includes('profile.html')) {
        checkAuth(); 
        loadProfile();
    }
});