document.getElementById('search').addEventListener('input', function() {
    const searchQuery = this.value;
    console.log('Buscando por:', searchQuery);
});

document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');
    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            if (menuToggle.classList.contains('active')) {
                menuDropdown.style.display = 'block';
            } else {
                menuDropdown.style.display = 'none';
            }
        });
        document.addEventListener('click', function(e) {
            if (menuDropdown.style.display === 'block') {
                menuDropdown.style.display = 'none';
                menuToggle.classList.remove('active');
            }
        });
        menuDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    // Redirecionamento para login
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function() {
            window.location.href = '../login/login.html';
        });
    }
});
