//Seleciona os elemntos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount"); //pegando o elemento do formulario pelo ID - (Valor da despesa)
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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
  //OBTÉM O VALOR DO INPUT E REMOVE OS CARACTERES NÃO NÚMERICOS
  let value = amount.value.replace(/\D/g, "");

  //Transforma o valor em centavos. (exemplo se voce pegar 150 e dividir por 100 = 1.50 que é equivalente a R$1,50)
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
    create_at: new Date(""),
  };
};
