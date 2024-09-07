// Major, Religion, and Prefix lookups
const majors = {
    "0": "วท.บ.เคมี",
    "1": "วท.บ.วิทยาศาสตร์สิ่งแวดล้อม",
    "2": "วท.บ.คณิตศาสตร์และการจัดการข้อมูล",
    "3": "วท.บ.วิทยาการคอมพิวเตอร์และสารสนเทศ",
    "4": "วท.บ.ชีววิทยาศาสตร์",
    "5": "วท.บ.คณิตศาสตร์และการจัดการข้อมูล ร่วมกับ วท.บ.วิทยาการคอมพิวเตอร์และสารสนเทศ"
};

const religions = {
    "0": "คริสต์",
    "1": "อิสลาม",
    "2": "พุทธ",
    "3": "ฮินดู"
};

const prefix = {
    "0": "นาย",
    "1": "นางสาว"
};

// Fetch all students and populate the table
async function fetchStudents() {
    try {
        const response = await fetch('/auth/read_info'); // Adjust endpoint as needed
        if (!response.ok) throw new Error('Network response was not ok');
        const students = await response.json();
        const tableBody = document.querySelector('#studentTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        students.forEach(student => {
            const majorName = majors[student.major] || 'Unknown';
            const preName = prefix[student.prefix] || 'Unknown';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.std_id}</td>
                <td>${preName} ${student.std_Fname} ${student.std_Lname}</td>
                <td>${majorName}</td>
                <td>${student.std_tel || 'N/A'}</td>
                <td class="actions">
                    <button class="details-button" onclick="showDetails(${student.std_id})">Detail</button>
                    <button class="edit-button" onclick="openEditModal(${student.std_id})">Edit</button>
                    <button class="delete-button" onclick="deleteStudent(${student.std_id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

// Show student details in a modal
function showDetails(id) {
    fetch(`/auth/read_info/${id}`)
        .then(response => response.json())
        .then(student => {
            const religionName = religions[student.std_religion] || 'Unknown';
            const majorName = majors[student.major] || 'Unknown';
            const preName = prefix[student.prefix] || 'Unknown';
            const details = `
                <p><strong>รหัสนิสิต:</strong> ${student.std_id || 'N/A'}</p>
                <p><strong>ชื่อ - นามสกุล:</strong> ${preName} ${student.std_Fname} ${student.std_Lname}</p>
                <p><strong>ชื่อเล่น:</strong> ${student.std_nickname || 'N/A'} <strong>เบอร์โทร:</strong> ${student.std_tel || 'N/A'}</p>
                <p><strong>ศาสนา:</strong> ${religionName}</p>
                <p><strong>วิชาเอก:</strong> ${majorName}</p>
                <p><strong>ชื่อบิดา:</strong> ${student.std_father_name || 'N/A'}, <strong>เบอร์โทร:</strong> ${student.std_father_tel || 'N/A'}</p>
                <p><strong>ชื่อมารดา:</strong> ${student.std_mother_name || 'N/A'}, <strong>เบอร์โทร:</strong> ${student.std_mother_tel || 'N/A'}</p>
                <p><strong>ชื่อผู้ปกครอง:</strong> ${student.std_parent_name || 'N/A'}, <strong>เบอร์โทร:</strong> ${student.std_parent_tel || 'N/A'}, <strong>ความสัมพันธ์:</strong> ${student.std_parent_rela || 'N/A'}</p>
                <p><strong>อาหารที่แพ้:</strong> ${student.allergic_things || 'N/A'}, <strong>ประวัติการแพ้ยา:</strong> ${student.allergic_drugs || 'N/A'}, <strong>ประวัติทางการแพทย์:</strong> ${student.allergic_condition || 'N/A'}</p>
                <p><strong>ชื่อโรงเรียนที่จบ:</strong> ${student.sch_name || 'N/A'}, <strong>จังหวัด:</strong> ${student.sch_province || 'N/A'}</p>
            `;
            document.getElementById('studentDetails').innerHTML = details;
            document.getElementById('studentModal').style.display = 'block';
        })
        .catch(error => console.error('Error fetching student details:', error));
}

// Close the modal
function closeModal() {
    document.getElementById('studentModal').style.display = 'none';
}

// Close the edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Open the edit modal and populate form with student data
function openEditModal(id) {
    fetch(`/auth/read_info/${id}`)
        .then(response => response.json())
        .then(student => {
            document.getElementById('std_id').value = student.std_id || '';
            document.getElementById('std_Fname').value = student.std_Fname || '';
            document.getElementById('std_Lname').value = student.std_Lname || '';
            document.getElementById('std_tel').value = student.std_tel || '';
            document.getElementById('std_father_name').value = student.std_father_name || '';
            document.getElementById('std_father_tel').value = student.std_father_tel || '';
            document.getElementById('std_mother_name').value = student.std_mother_name || '';
            document.getElementById('std_mother_tel').value = student.std_mother_tel || '';
            document.getElementById('std_parent_name').value = student.std_parent_name || '';
            document.getElementById('std_parent_tel').value = student.std_parent_tel || '';
            document.getElementById('std_parent_rela').value = student.std_parent_rela || '';
            document.getElementById('allergic_things').value = student.allergic_things || '';
            document.getElementById('allergic_drugs').value = student.allergic_drugs || '';
            document.getElementById('allergic_condition').value = student.allergic_condition || '';
            document.getElementById('sch_name').value = student.sch_name || '';
            document.getElementById('sch_province').value = student.sch_province || '';
            document.getElementById('std_nickname').value = student.std_nickname || '';
            
            // Update the selected buttons for prefix, major, and religion
            document.querySelectorAll('.btn[data-group="prefix"]').forEach(btn => {
                btn.classList.toggle('selected', btn.getAttribute('data-value') === student.prefix);
            });
            document.querySelectorAll('.btn[data-group="major"]').forEach(btn => {
                btn.classList.toggle('selected', btn.getAttribute('data-value') === student.major);
            });
            document.querySelectorAll('.btn[data-group="religion"]').forEach(btn => {
                btn.classList.toggle('selected', btn.getAttribute('data-value') === student.std_religion);
            });

            // Show the edit modal
            document.getElementById('editModal').style.display = 'block';
        })
        .catch(error => console.error('Error fetching student data for edit:', error));
}

// Submit updated student information
async function submitEdit() {
    const id = document.getElementById('std_id').value;
    const updates = {
        std_Fname: document.getElementById('std_Fname').value,
        std_Lname: document.getElementById('std_Lname').value,
        std_tel: document.getElementById('std_tel').value,
        std_father_name: document.getElementById('std_father_name').value,
        std_father_tel: document.getElementById('std_father_tel').value,
        std_mother_name: document.getElementById('std_mother_name').value,
        std_mother_tel: document.getElementById('std_mother_tel').value,
        std_parent_name: document.getElementById('std_parent_name').value,
        std_parent_tel: document.getElementById('std_parent_tel').value,
        std_parent_rela: document.getElementById('std_parent_rela').value,
        allergic_things: document.getElementById('allergic_things').value,
        allergic_drugs: document.getElementById('allergic_drugs').value,
        allergic_condition: document.getElementById('allergic_condition').value,
        sch_name: document.getElementById('sch_name').value,
        sch_province: document.getElementById('sch_province').value,
        prefix: document.querySelector('.btn.selected[data-group="prefix"]').getAttribute('data-value'),
        major: document.querySelector('.btn.selected[data-group="major"]').getAttribute('data-value'),
        std_nickname: document.getElementById('std_nickname').value,
        std_religion: document.querySelector('.btn.selected[data-group="religion"]').getAttribute('data-value')
    };

    // Validate required fields
    if (!updates.std_Fname || !updates.std_Lname || !updates.std_tel || !updates.major) {
        alert('First name, last name, phone number, and major are required.');
        return;
    }

    try {
        const response = await fetch(`/auth/fill_info/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        alert(result.message);
        fetchStudents(); // Refresh the table
        closeEditModal(); // Close the edit modal
    } catch (error) {
        console.error('Error updating student:', error);
    }
}

// Delete a student record
async function deleteStudent(id) {
    if (confirm(`Are you sure you want to delete student ID: ${id}?`)) {
        try {
            const response = await fetch(`/auth/${id}`, { method: 'DELETE' });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            alert(result.message);
            fetchStudents(); // Refresh the table
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
}

// Search for students by name, major, or ID
function searchStudent() {
    const input = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#studentTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const found = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(input));
        row.style.display = found ? '' : 'none';
    });
}

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

// Initial fetch to populate the table
fetchStudents();
