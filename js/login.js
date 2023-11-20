// Validate login credentials to proceed to home page
function checkLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if username and password are correct
    if (username === "admin" && password === "admin") {
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}
