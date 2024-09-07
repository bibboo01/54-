function showProfile() {
    document.getElementById('profileModal').style.display = 'block';
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// Optional: Close modal when clicking outside of the modal
window.onclick = function(event) {
    if (event.target == document.getElementById('profileModal')) {
        closeProfileModal();
    }
}
