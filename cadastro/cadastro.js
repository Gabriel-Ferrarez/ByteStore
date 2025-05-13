document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nome || !email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    if (!emailValido) {
        alert('Digite um email válido!');
        return;
    }

    alert('Cadastro realizado com sucesso!');
    

    window.location.href = '../home/home.html';
});

document.getElementById('loginRedirect').addEventListener('click', function() {
    window.location.href = '../login/login.html';
});
