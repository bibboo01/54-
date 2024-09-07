document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

function fetchUsers() {
    fetch('/auth/read/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            const tbody = document.getElementById('userTableBody');
            tbody.innerHTML = ''; // Clear existing rows

            users.forEach((user, index) => {
                const role = user.role === 0 ? 'Admin' : (user.role === 1 ? 'User' : 'Unknown');

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${role}</td>
                    <td class="action-buttons">
                        <button class="edit-button" onclick="openEditModal('${user._id}')">Edit</button>
                        <button class="delete-button" onclick="deleteUser('${user._id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('There was an error fetching user data. Please try again later.');
        });
}

function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
        fetch(`/auth/del/${userId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert(`User with ID: ${userId} has been deleted.`);
                fetchUsers(); // Refresh the user list
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                alert('There was an error deleting the user. Please try again later.');
            });
    }
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function openEditModal(userId) {
    fetch(`/auth/read/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            document.getElementById('editUserId').value = user._id || '';
            document.getElementById('username').value = user.username || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('password').value = ''; // Clear password field
            document.getElementById('role').value = user.role || '';

            // Show the edit modal
            document.getElementById('editModal').style.display = 'flex';
        })
        .catch(error => {
            console.error('Error fetching user data for edit:', error);
            alert('There was an error fetching user data for editing. Please try again later.');
        });
}

function saveUser() {
    const userId = document.getElementById('editUserId').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch(`/auth/edit/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password: password.trim() ? password : undefined, // Only send password if not empty
            role
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('User updated successfully.');
            closeEditModal(); // Close the modal
            fetchUsers(); // Refresh the user list
        })
        .catch(error => {
            console.error('Error updating user:', error);
            alert('There was an error updating the user. Please try again later.');
        });
}

// Event listener for closing the modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
});
