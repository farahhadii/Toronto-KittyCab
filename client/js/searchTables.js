async function myFunction() {
    try {
        var params = new URLSearchParams(window.location.search);
        var sqlQuery = document.getElementById("sqlQuery").value;

        // Check if the input length is greater than 0
        if (sqlQuery.trim().length === 0) {
            console.log("Input is empty. Not performing fetch.");
            return; // Exit the function if input is empty
        }

        sqlQuery = sqlQuery.replace(/\n/g, ' ');
        sqlQuery = sqlQuery.replace(';', ' ');
        console.log(sqlQuery);

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
        console.log(data);

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.splash-screen').style.display = 'flex';
    setTimeout(function() {
        document.querySelector('.splash-screen').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 1000);
});