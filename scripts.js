//1. Ouvir o evento de quando o usuário sair do campo CEP
document.getElementById('cep').addEventListener('blur', (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    // 2. Validação: garante que o CEP tenha 8 dígitos numéricos
    const cepValido = /^[0-9]{8}$/.test(cepInformado);
    if (!cepValido) {
        alert('Digite um CEP válido com 8 números!');
        return;
    }

    // 3. Busca os dados no ViaCEP
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json()) 
        .then(data => {
            if(!data.erro) {
                // Preenche os campos
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;

                // Armazena no localStorage
                localStorage.setItem("cep", cepInformado);
                localStorage.setItem("logradouro", data.logradouro);
                localStorage.setItem("bairro", data.bairro); 
                localStorage.setItem("cidade", data.localidade);
                localStorage.setItem("estado", data.uf);
            } else {
                alert('CEP não encontrado!');
            }
        })
        .catch(error => console.error('Erro ao buscar o CEP: ', error));

    
});

window.addEventListener('load', () => {
    const cep = localStorage.getItem("cep");
    const logradouro = localStorage.getItem("logradouro");
    const bairro = localStorage.getItem("bairro");
    const cidade = localStorage.getItem("cidade");
    const estado = localStorage.getItem("estado");

    // Se houver um CEP armazenado, preenche os campos
    if (cep) document.getElementById('cep').value = cep;
    if (logradouro) document.getElementById('logradouro').value = logradouro;
    if (bairro) document.getElementById('bairro').value = bairro;
    if (cidade) document.getElementById('cidade').value = cidade;
    if (estado) document.getElementById('estado').value = estado;
});