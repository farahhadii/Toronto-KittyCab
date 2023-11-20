class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <link rel="stylesheet" type="text/css" href="../css/navbar.css">

        <header>
        <nav class="navbar">
            <ul>
                <li><a href="../pages/home.html">Home</a></li>
                <li><a href="../pages/dropTables.html">Drop</a></li>
                <li><a href="../pages/createTables.html">Create</a></li>
                <li><a href="../pages/populateTables.html">Populate</a></li>
                <li><a href="../pages/queryTables.html">Query</a></li>
                <li><a href="../pages/viewTables.html">View</a></li>
            </ul>
        </nav>
        </header>
        `;
    }
}

customElements.define('navbar-component', Header);