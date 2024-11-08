document.addEventListener('DOMContentLoaded', function() {
    let characters = [];
    let currentCharacterIndex = 0;
    let isTableView = true;

    const tableView = document.getElementById('tableView');
    const characterDiv = document.getElementById('characterView');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const toggleViewButton = document.getElementById('toggleViewButton');

    // Fetch characters data from the server
    fetch('/api/characters')
        .then(response => response.json())
        .then(data => {
            characters = data;
            createTableView(data);
            displayCharacter(currentCharacterIndex);
        })
        .catch(error => console.error('Error fetching characters:', error));

    // Function to create and display the table view
    function createTableView(data) {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        // Define table headers
        const headers = ['ID', 'Name', 'Universe', 'Abilities'];
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        table.appendChild(headerRow);

        // Populate table rows with character data
        data.forEach(character => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = character.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = character.name;
            row.appendChild(nameCell);

            const universeCell = document.createElement('td');
            universeCell.textContent = character.universe;
            row.appendChild(universeCell);

            const abilitiesCell = document.createElement('td');
            abilitiesCell.textContent = character.abilities.join(', ');
            row.appendChild(abilitiesCell);

            table.appendChild(row);
        });

        tableView.appendChild(table);
    }

    // Function to display a single character
    function displayCharacter(index) {
        const character = characters[index];
        characterDiv.innerHTML = `
            <h2>${character.name}</h2>
            <p><strong>Universe:</strong> ${character.universe}</p>
            <p><strong>Abilities:</strong> ${character.abilities.join(', ')}</p>
        `;
    }

    // Event listener for the Next button
    nextButton.addEventListener('click', function() {
        if (!isTableView) {
            currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
            displayCharacter(currentCharacterIndex);
        }
    });

    // Event listener for the Previous button
    prevButton.addEventListener('click', function() {
        if (!isTableView) {
            currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
            displayCharacter(currentCharacterIndex);
        }
    });

    // Event listener for the Toggle View button
    toggleViewButton.addEventListener('click', function() {
        isTableView = !isTableView;
        tableView.style.display = isTableView ? 'block' : 'none';
        characterDiv.style.display = isTableView ? 'none' : 'block';
    });
});
