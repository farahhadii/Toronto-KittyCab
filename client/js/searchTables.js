async function myFunction() {
    var params = new URLSearchParams(window.location.search);
    var sqlQuery = document.getElementById("sqlQuery").value;
    sqlQuery = sqlQuery.replace(/\n/g, ' ');
    console.log(sqlQuery)

    const response = await fetch(`http://localhost:4000/search-table?sqlQuery=${encodeURIComponent(sqlQuery)}`, {
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