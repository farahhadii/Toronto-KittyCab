async function myFunction() {
    const response = await fetch('http://localhost:4000/create-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log("Create")

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