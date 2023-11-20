var params = new URLSearchParams(window.location.search);
var table = params.get('table');

if (table) {
    document.getElementById('table-name').innerText = table;

    // Okay we need to do the fetch request here
}
