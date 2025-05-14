document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    if (!emailValido) {
        alert('Digite um email válido!');
        return;
    }

    alert('Login realizado com sucesso!');
    
    window.location.href = '../home/home.html';
});

document.getElementById('cadastroRedirect').addEventListener('click', function() {
    window.location.href = '../cadastro/cadastro.html';
});
