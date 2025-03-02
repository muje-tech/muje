document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const authForms = document.querySelectorAll('.auth-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Remove active class from all tabs and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            authForms.forEach(form => form.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Login Form Submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const errorMessageDiv = document.getElementById('loginErrorMessage');

        // Basic client-side validation (replace with server-side validation)
        if (username === 'test' && password === 'password') { //change credentials to a proper login authentication method.
            localStorage.setItem('loggedInUser', username);
            errorMessageDiv.textContent = '';
            window.location.href = "dashboard.html"; // Replace with your dashboard URL
        } else {
            errorMessageDiv.textContent = 'Invalid username or password.';
        }
    });

    // Register Form Submission
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessageDiv = document.getElementById('registerErrorMessage');

        if (password !== confirmPassword) {
            errorMessageDiv.textContent = 'Passwords do not match.';
            return;
        }

        // Simulate successful registration (replace with server-side logic)
        localStorage.setItem('registeredUser', username);
        errorMessageDiv.textContent = '';
        alert('Registration successful!'); // Or redirect to login
        document.querySelector('.tab-button[data-tab="login"]').click(); // switch to login tab.
    });

    // Forgot Password Form Submission
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('forgotEmail').value;
        const errorMessageDiv = document.getElementById('forgotErrorMessage');

        // Simulate password reset request (replace with server-side logic)
        alert(`Password reset link sent to ${email}.`); // Or display a success message
        errorMessageDiv.textContent = '';
    });

    // Check if user is logged in on page load
    if(localStorage.getItem('loggedInUser')){
        // redirect them if so.
        window.location.href = "dashboard.html";
    }
});