// Busca no HTML os elementos do formulário que serão usados no JavaScript.
const form = document.querySelector("form");
const amount = document.getElementById("amount"); //pegando o elemento do formulario pelo ID - (Valor da despesa)
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Busca no HTML a lista onde as despesas serão adicionadas.
const expenseList = document.querySelector("ul");
const exepensesTotal = document.querySelector("aside header h2");
const expensesQuantity = document.querySelector("aside header p span");

/*esse evento fica observando toda vez que entrar algum conteudo ali no nosso input.
Toda vez que ele acontecer, ele disparara esse evento.
captura entrada de valores no input (Valor da despesa).
-------------------------------------------------------------------------------------
recebendo o valor do input, tirando as letras e devolvendo so numero para ele
o "barra D" significa procurando por caracteres não numericos, o "g" significa global pra ele sempre olhar
para a string como um todo, e se ele achar eu peço para ele retornar nada, faço isso com uma string vazia "".
a ultima parte do codigo ele esta pegando o value ja formatado.
(CAPTURANDO O EVENTO DE INPUT PARA FORMATAR O VALOR)
*/
amount.oninput = () => {
  //OBTÉM O VALOR DO INPUT E REMOVE OS CARACTERES NÃO NÚMERICOS, Pega o valor digitado e remove tudo que não for número.
  let value = amount.value.replace(/\D/g, "");

  //Transforma o valor em centavos. (exemplo se voce pegar 150 e dividir por 100 = 1.50 que é equivalente a R$1,50) Converte o texto em número e divide por 100 para considerar os centavos.
  value = Number(value) / 100;

  //ATUALIZA O VALOR DO INPUT
  amount.value = formateCurrencyBRL(value);
};

function formateCurrencyBRL(value) {
  //formata o valor no padrão brl (real brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //Retorna o valor formatado
  return value;
}

// captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  // previne o comportamento padrao de fazer reload a página
  event.preventDefault();

  //cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text, //pegando as opções que tem dentro do category, mas eu nao quero todas, quero a selecionada por isso eu to pegando o selectedIndex do category e eu quero o texto q ta ali
    amount: amount.value,
    create_at: new Date(),
  };

  //chama a função que ira adicionar o item na lista
  expenseaAdd(newExpense);
};

// Adiciona um novo item a lista
function expenseaAdd(newExpense) {
  try {
    //Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense"); //colocando class no elemento dinamicamente com js

    // Cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Criando a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Criando o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Criando a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //adiciona nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory);

    //Cria o valor da despesa
    const expenseAmount = document.createElement("small");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

    //Criando o ícone para remover um item
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //adiciona o item na lista
    expenseList.append(expenseItem);

    // Limpa o formulario para adicionar um novo item
    formClear();

    //Atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possivel atualizar a lsita de despesas.");
    console.log(error);
  }
}

//Atualiizar os totais de despesas
function updateTotals() {
  try {
    //Recupera todos os itens que sao (li) da nossa lista que é a (ul)
    const items = expenseList.children;

    //Atualiza a quantidade de items da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    //Variavel para poder incrementar o total - vamos percorrer cada item que existe dentro dessa lista para ir salvando a somatoria
    let total = 0;

    //Percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      //Remover caracteres não numericos e substitui a "," pelo "."
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      //Converte o valor para float
      value = parseFloat(value);

      //Verifica se é um número válido
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número",
        );
      }

      //Incrementa o valor total
      total += Number(value);
    }

    //cria span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    //Formatando o valor e removendo o R$ que será exibido pela small com um estilo customizado
    total = formateCurrencyBRL(total).toUpperCase().replace("R$", "");

    //Limpa o conteúdo do elemento
    exepensesTotal.innerHTML = "";

    //Adiciona o simbolo da moeda e o valor total formatado
    exepensesTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais");
  }
}

// Evento que captura o click nos itens da lista.
expenseList.addEventListener("click", function (event) {
  //Verifica se o elemento clicado é o icone de remover
  if (event.target.classList.contains("remove-icon")) {
    //Obtendo a li pai do elemento clicado
    const item = event.target.closest(".expense");

    // Remove o item da lista
    item.remove();
  }

  // Atualiza os totais
  updateTotals();
});

function formClear() {
  //Limpa os inputs
  expense.value = "";
  category.value = "";
  amount.value = "";

  // Coloca o foco no input de amount
  expense.focus();
}
