async function myFunction() {
    showSplashForButtonClick();
    const response = await fetch('http://localhost:4000/create-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    });
  
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

function showSplashScreen() {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.splash-screen').style.display = 'flex';
        setTimeout(function() {
            document.querySelector('.splash-screen').style.display = 'none';
            document.querySelector('.content').style.display = 'block';
        }, 1000);
    });
}

function showSplashForButtonClick() {
    document.addEventListener('click', function () {
        const content = document.querySelector('.content');
        content.style.display = 'none'; 

        const splashScreen = document.querySelector('.splash-screen');
        splashScreen.style.display = 'flex'; 
        setTimeout(function() {
            splashScreen.style.display = 'none';
            content.style.display = 'block'; 
        }, 1000);
    });
}

showSplashScreen();