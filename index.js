let username = "Admin";
let password = "admin123";


function login(){
    event.preventDefault();
    var input_user = document.getElementById("USERNAME").value;
    var input_pass = document.getElementById("PASSWORD").value;

    if(input_user == username && input_pass == password){
        window.location.href = 'accounts.html'
    }
    else{
        alert('Invalid user or Password')
    }
    
}


//for the accounts
document.addEventListener('DOMContentLoaded', function() {
    const surnames = ["Casaclang", "Imperial", "Hernandez", "Untolan", "Itoc"];
    const firstnames = ["John Joseph", "Chester", "John Kennedy", "Jeffrick", "Joel"];
    const ages = ["20", "20", "22", "20", "21"];
    const sexes = ["Male", "Male", "Male", "Male", "Male"];

    // Array of image paths corresponding to each row index
    let imagePaths = [
        'path_to_image_1.jpg',
        'path_to_image_2.jpg',
        'path_to_image_3.jpg',
        'path_to_image_4.jpg',
        'Joel.jpg',
        // Add more image paths as needed
    ];

    const table = document.getElementById('infoTable');
    const pictureContainer = document.getElementById('pictureContainer');

    // Function to create table rows
    function createTableRow(surname, firstname, age, sex, index) {
        const row = document.createElement('tr');

        const surnameCell = document.createElement('td');
        surnameCell.textContent = surname;
        row.appendChild(surnameCell);

        const firstnameCell = document.createElement('td');
        firstnameCell.textContent = firstname;
        row.appendChild(firstnameCell);

        const ageCell = document.createElement('td');
        ageCell.textContent = age;
        row.appendChild(ageCell);

        const sexCell = document.createElement('td');
        sexCell.textContent = sex;
        row.appendChild(sexCell);

        const buttonCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editRow(row, index));
        buttonCell.appendChild(editButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeRow(row, index));
        buttonCell.appendChild(removeButton);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.style.display = 'none'; // Initially hide save button
        saveButton.addEventListener('click', () => saveRow(row, index));
        buttonCell.appendChild(saveButton);

        row.appendChild(buttonCell);

        // Add click event listener to row
        row.addEventListener('click', () => {
            showPicture(index); // Change index to the actual index in your data arrays
        });

        return row;
    }

    // Function to edit a row
    function editRow(row, index) {
        const cells = row.querySelectorAll('td');
        for (let i = 0; i < cells.length - 1; i++) {
            const cellContent = cells[i].textContent;
            cells[i].innerHTML = `<input type="text" value="${cellContent}" class="editable-input">`;
        }
        row.querySelector('button:nth-child(1)').style.display = 'none'; // Hide edit button
        row.querySelector('button:nth-child(2)').style.display = 'none'; // Hide remove button
        row.querySelector('button:nth-child(3)').style.display = 'inline'; // Display save button

        // Create file input for uploading image
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'block'; // Initially visible
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Update imagePaths array with the uploaded image
                    imagePaths[index] = e.target.result;
                    // Display the updated image
                    showPicture(index);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
        cells[cells.length - 1].appendChild(fileInput);
    }

    // Function to save a row
    function saveRow(row, index) {
        const cells = row.querySelectorAll('td');
        for (let i = 0; i < cells.length - 1; i++) {
            const input = cells[i].querySelector('input');
            cells[i].textContent = input.value;
        }
        row.querySelector('button:nth-child(1)').style.display = 'inline'; // Display edit button
        row.querySelector('button:nth-child(2)').style.display = 'inline'; // Display remove button
        row.querySelector('button:nth-child(3)').style.display = 'none'; // Hide save button

        // Remove file input after saving
        const fileInput = row.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.remove();
        }
    }

    // Function to remove a row
    function removeRow(row, index) {
        row.remove();
        // Remove corresponding data from arrays
        surnames.splice(index, 1);
        firstnames.splice(index, 1);
        ages.splice(index, 1);
        sexes.splice(index, 1);
        imagePaths.splice(index, 1);
        // Update indices for remaining rows
        for (let i = index; i < surnames.length; i++) {
            const currentRow = table.rows[i + 1]; // +1 because table.rows[0] is the header row
            currentRow.removeEventListener('click', showPicture); // Remove previous event listener
            currentRow.addEventListener('click', () => showPicture(i)); // Add new event listener with updated index
        }
        showPicture(0); // Show the first picture after removing the row
    }

    // Function to show a picture based on the row index
    function showPicture(index) {
        // Clear previous image
        pictureContainer.innerHTML = '';

        // Check if the index is within range of imagePaths array
        if (index >= 0 && index < imagePaths.length) {
            // Create new image element
            const imageElement = document.createElement('img');
            imageElement.src = imagePaths[index];
            imageElement.alt = 'Picture';
            imageElement.style.maxWidth = '100%';

            // Append image to container
            pictureContainer.appendChild(imageElement);
        } else {
            console.error('Index out of range for imagePaths.');
        }
    }

    // Loop through the arrays and create a row for each set of values
    for (let i = 0; i < surnames.length; i++) {
        const row = createTableRow(surnames[i], firstnames[i], ages[i], sexes[i], i);
        table.appendChild(row);
    }
});



