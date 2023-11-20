async function myFunction() {
    let tableName = 'Account';
    const response = await fetch(`http://localhost:4000/create-table`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}
