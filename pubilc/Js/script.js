document.addEventListener('DOMContentLoaded', function() {
    const signUpBtn = document.getElementById('sign-up-btn');
    const signInBtn = document.getElementById('sign-in-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    function openForm(formType) {
        modalOverlay.style.display = 'block';
        document.getElementById(formType + '-container').classList.add('show');
    }

    function closeForm(formType) {
        const form = document.getElementById(formType + '-container');
        if (form) {
            form.classList.add('hide');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                form.classList.remove('show', 'hide');
            }, 300); // Match the CSS transition duration
        }
    }

    signUpBtn.addEventListener('click', function(event) {
        event.preventDefault();
        closeForm('login');
        openForm('register');
    });

    signInBtn.addEventListener('click', function(event) {
        event.preventDefault();
        closeForm('register');
        openForm('login');
    });

    modalOverlay.addEventListener('click', function() {
        closeForm('login');
        closeForm('register');
    });

    // Add event listener to all close buttons
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function() {
            const formType = this.closest('.modal-container').id.split('-')[0];
            closeForm(formType);
        });
    });
});
// Button selection functionality for the form
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const group = button.getAttribute('data-group');
        const value = button.getAttribute('data-value');

        document.querySelectorAll(`button[data-group="${group}"]`).forEach(btn => {
            btn.classList.remove('selected');
        });

        button.classList.add('selected');
    });
});

