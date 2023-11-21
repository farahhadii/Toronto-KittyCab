async function dropTable() {
    const response = await fetch(`http://localhost:4000/drop-table`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.splash-screen').style.display = 'flex';
    setTimeout(function() {
        document.querySelector('.splash-screen').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 1000);
});