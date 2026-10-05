//Seleciona os elemntos do formulário.
const amount = document.getElementById("amount"); //pegando o elemento do formulario pelo ID - (Valor da despesa)

/*esse evento fica observando toda vez que entrar algum conteudo ali no nosso input.
Toda vez que ele acontecer, ele disparara esse evento.
captura entrada de valores no input (Valor da despesa).
-------------------------------------------------------------------------------------
recebendo o valor do input, tirando as letras e devolvendo so numero para ele
o "barra D" significa procurando por caracteres não numericos, o "g" significa global pra ele sempre olhar
para a string como um todo, e se ele achar eu peço para ele retornar nada, faço isso com uma string vazia "".
a ultima parte do codigo ele esta pegando o value ja formatado.
*/
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");
  amount.value = value;
};
