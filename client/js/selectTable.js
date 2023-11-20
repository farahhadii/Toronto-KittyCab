async function myFunction() {
    let tableName = 'Account';
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
    console.log(data);
}