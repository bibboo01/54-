document.addEventListener('DOMContentLoaded', () => {
    // Function to handle search button click
    function searchStudent() {
        const searchInput = document.getElementById('search').value;
        console.log(`Searching for: ${searchInput}`);
        // Add actual search logic here
    }

    // Profile menu toggle logic
    const profileLink = document.getElementById('profile-link');
    const profileMenu = document.getElementById('profileMenu');

    profileLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        profileMenu.classList.toggle('active'); // Toggle the active class to show/hide the menu
    });

    // Close profile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!profileLink.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove('active');
        }
    });

    // Menu toggle logic for mobile view
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open'); // Toggle a class to show/hide the menu in mobile view
    });

    // Logout button click
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        // Add actual logout logic here
        console.log('Logging out...');
        // For example: window.location.href = '/logout'; (or any logout URL)
    });

    // Optional: Functionality to handle search on Enter key press
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchStudent();
        }
    });
});
