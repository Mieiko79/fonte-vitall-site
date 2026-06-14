let pedido = [];
let total = 0;

function adicionarProduto(nome, preco) {
  pedido.push({ nome, preco });
  total += preco;
  atualizarPedido();
}

function atualizarPedido() {
  const lista = document.getElementById("listaPedido");
  const totalElemento = document.getElementById("total");

  lista.innerHTML = "";

  pedido.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
      <button onclick="removerProduto(${index})">X</button>
    `;

    lista.appendChild(li);
  });

  totalElemento.textContent = total.toFixed(2).replace(".", ",");
}

function removerProduto(index) {
  total -= pedido[index].preco;
  pedido.splice(index, 1);
  atualizarPedido();
}

function limparPedido() {
  pedido = [];
  total = 0;
  atualizarPedido();
}

function finalizarPedido() {
  const nome = document.getElementById("nomeCliente").value.trim();
  const endereco = document.getElementById("enderecoCliente").value.trim();
  const observacao = document.getElementById("observacao").value.trim();

  if (pedido.length === 0) {
    alert("Adicione pelo menos um produto ao pedido.");
    return;
  }

  if (nome === "" || endereco === "") {
    alert("Preencha seu nome e endereço.");
    return;
  }

  let mensagem = `Olá, meu nome é ${nome}. Gostaria de fazer um pedido:%0A%0A`;

  pedido.forEach(item => {
    mensagem += `- ${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}%0A`;
  });

  mensagem += `%0ATotal: R$ ${total.toFixed(2).replace(".", ",")}`;
  mensagem += `%0AEndereço: ${endereco}`;

  if (observacao !== "") {
    mensagem += `%0AObservação: ${observacao}`;
  }

  const telefone = "5549991698706";
  const linkWhatsApp = `https://wa.me/${telefone}?text=${mensagem}`;

  window.open(linkWhatsApp, "_blank");
}