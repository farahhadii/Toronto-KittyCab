async function myFunction() {
    var params = new URLSearchParams(window.location.search);
    var tableName = params.get('table');

    const response = await fetch(`http://localhost:4000/select-table?table=${tableName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', async function () {
    const records = await myFunction();
    const recordsContainer = document.getElementById('records-container');

    var params = new URLSearchParams(window.location.search);
    var tableName = params.get('table');
    if (!tableName) {
        console.error('No table name specified in URL parameters.');
        return;
    }
    // Set the table Name
    const tableNameElement = document.getElementById('table-name');
    tableNameElement.textContent = tableName; 

    // Create Table
    const table = document.createElement('table');
    table.classList.add('styled-table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    if (records.length > 0) {
        Object.keys(records[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });

        const editDeleteHeader = document.createElement('th');
        editDeleteHeader.textContent = 'Actions';
        headerRow.appendChild(editDeleteHeader);
        thead.appendChild(headerRow);
    }
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    let keys = Object.keys(records[0]);
    let primaryKeyColumn = keys[0];
    records.forEach(record => {
        const row = document.createElement('tr');
        let recordId;
        Object.entries(record).forEach(([key, value]) => {
            if (key.toUpperCase() === primaryKeyColumn) {
                recordId = value;
            }
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', function handleEditSave() {
            if (editButton.textContent === 'Edit') {
                row.dataset.originalData = JSON.stringify(Array.from(row.querySelectorAll('td:not(:last-child)')).map(td => td.textContent));
                row.querySelectorAll('td:not(:last-child)').forEach(cell => {
                    cell.setAttribute('contenteditable', true);
                });
                editButton.textContent = 'Save';
            } else {
                let updatedData = {};
                row.querySelectorAll('td:not(:last-child)').forEach((cell, index) => {
                    let columnName = keys[index];
                    updatedData[columnName] = cell.textContent;
                    cell.setAttribute('contenteditable', false);
                });
                updateDatabaseRow(primaryKeyColumn, recordId, updatedData, tableName)
                    .then(() => {
                        editButton.textContent = 'Edit';
                    })
                    .catch(error => {
                        console.error('Error updating row:', error);
                        alert('An error occurred while trying to update the record.');
                    });
            }
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => handleDelete(recordId, primaryKeyColumn, row));

        
        const actionCell = document.createElement('td');
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    recordsContainer.appendChild(table);
});

// Function to handle the deletion of a record
async function handleDelete(recordId, primaryKeyColumn, row) {
    var params = new URLSearchParams(window.location.search);
    var tableName = params.get('table');

    try {
        const encodedTableName = encodeURIComponent(tableName);
        const encodedPrimaryKeyColumn = encodeURIComponent(primaryKeyColumn);
        const encodedRecordId = encodeURIComponent(recordId);
        const response = await fetch(`http://localhost:4000/delete-record/${encodedTableName}/${encodedPrimaryKeyColumn}/${encodedRecordId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Record deleted successfully');
            row.remove(); 
        } else {
            if (response.status === 500) {
                const errorData = await response.json();
                if (errorData.code === 'ORA-02292') {
                    alert('Cannot delete this record because it is referenced by other records.');
                } else {
                    alert('Failed to delete record. Error: ' + errorData.message);
                }
            } else {
                alert('Failed to delete record. HTTP status: ' + response.status);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to delete the record.');
    }
}
// Function to handle editing a record
async function updateDatabaseRow(primaryKeyColumn, recordId, updatedData, tableName) {
    try {
        const response = await fetch(`http://localhost:4000/update-row`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tableName: tableName,
                rowData: updatedData,
                keyColumn: primaryKeyColumn,
                keyValue: recordId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert('Failed to update record. Error: ' + errorData.message);
        } else {
            alert("Row updated successfully");
        }
    } catch (error) {
        console.error('Error updating row:', error);
        alert('An error occurred while trying to update the record.');
    }
}
