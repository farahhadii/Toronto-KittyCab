async function myFunction1() {
    const response = await fetch(`http://localhost:4000/query1-table`, {
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

async function myFunction2() {

    const response = await fetch(`http://localhost:4000/query2-table`, {
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

async function myFunction3() {
    const response = await fetch(`http://localhost:4000/query3-table`, {
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

async function myFunction4() {
    const response = await fetch(`http://localhost:4000/query4-table`, {
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

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.splash-screen').style.display = 'flex';
    setTimeout(function() {
        document.querySelector('.splash-screen').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 1000);
});