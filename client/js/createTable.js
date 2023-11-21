async function myFunction() {
    let tableName = 'Account';
    const response = await fetch(`http://localhost:4000/create-table`);

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