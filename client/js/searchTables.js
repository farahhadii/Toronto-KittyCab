async function myFunction() {
    var params = new URLSearchParams(window.location.search);
    var tableName = params.get('table');

    console.log(tableName)

    const response = await fetch(`http://localhost:4000/search-table?table=${tableName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
}