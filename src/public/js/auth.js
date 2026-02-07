const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userData = {
            username: registerForm.username.value,
            email: registerForm.email.value,
            password: registerForm.password.value
        };

        try {
            await apiRequest('/auth/register', 'POST', userData);
            
            alert('Registration successful! Please login.');
            document.getElementById('loginForm').scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            alert('Registration Failed: ' + error.message);
        }
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const credentials = {
            email: loginForm.email.value,
            password: loginForm.password.value
        };

        try {
            const data = await apiRequest('/auth/login', 'POST', credentials);
            
            localStorage.setItem('token', data.token);
            if (data.username) localStorage.setItem('username', data.username);
            
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Login Failed: ' + error.message);
        }
    });
}

if (window.location.pathname.includes('profile.html')) {
    checkAuth();
    loadProfile();
}

async function loadProfile() {
    try {
        const user = await apiRequest('/users/me');
        
        document.getElementById('userName').textContent = user.username;
        document.getElementById('userEmail').textContent = user.email;

        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-email').value = user.email;

    } catch (error) {
        console.error('Profile Load Error:', error);
        document.getElementById('userName').textContent = 'Error loading profile';
    }
}

const editMode = document.getElementById('profile-edit-form');
if (editMode) {
    editMode.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updateData = {
            username: document.getElementById('edit-username').value,
            email: document.getElementById('edit-email').value
        };

        try {
            const updatedUser = await apiRequest('/users/profile', 'PUT', updateData);

            document.getElementById('userName').textContent = updatedUser.username;
            document.getElementById('userEmail').textContent = updatedUser.email;
            
            document.getElementById('profile-edit-form').style.display = 'none';
            document.getElementById('profile-view').style.display = 'block';
            
            alert('Profile updated successfully!');

        } catch (error) {
            alert('Update Failed: ' + error.message);
        }
    });
}

const editBtn = document.getElementById('editProfileBtn');
const cancelBtn = document.getElementById('cancelEditBtn');

if (editBtn) editBtn.onclick = () => {
    document.getElementById('profile-view').style.display = 'none';
    document.getElementById('profile-edit-form').style.display = 'block';
};
if (cancelBtn) cancelBtn.onclick = () => {
    document.getElementById('profile-edit-form').style.display = 'none';
    document.getElementById('profile-view').style.display = 'block';
};