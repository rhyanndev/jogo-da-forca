const $questionText = document.querySelector(".question");
const $startGameButton = document.querySelector(".start-quiz");

const $controlsContainer = document.querySelector(".controls-container");

const $userName = document.getElementById("user");
const $userField = document.querySelector(".insert-name-user");
const $playersName = document.querySelector(".players-name");

const $containerLeft = document.querySelector(".container-side-left");
const $containerRight = document.querySelector(".container-side-right");

const $keyBoardContent = document.querySelector(".container-keyboard");
const $keyBoardLetters = document.querySelectorAll('.key');

const $answerForQuestion = document.querySelector('.answer');
const $letterUsed = document.querySelector(".letras-usadas");
const $bodyBox = document.querySelectorAll(".body-box");
let underscoreString = '';
let letrasUtilizadas = [];


$startGameButton.addEventListener("click", startGame);

let currentQuestionIndex = 1;


function startGame (){


  if($userName.value.trim() === ""){
    alert('Preencha seu nome!');
}

  else{

    const playUser = $userName.value;
    $startGameButton.classList.add("hide");
    $controlsContainer.classList.add("hide");
    $userField.classList.add("hide");
    $containerLeft.classList.remove("hide");
    $containerRight.classList.remove("hide");
    $playersName.textContent = `Jogador: ${playUser.toUpperCase()}`

    displayQuestion();
}

}

function displayQuestion() {

letrasUtilizadas = []; // Limpa a lista de letras utilizadas no início de cada rodada

// Exibe o texto da pergunta atual
$questionText.textContent = questions[currentQuestionIndex].question;



let totalLetras = 0;

totalLetras = questions[currentQuestionIndex].answer.replace(/ /g, '').length;

console.log("Total de letras nesta resposta:", totalLetras);


const respostaCorreta = questions[currentQuestionIndex].answer;

underscoreString = '';

for (let index = 0; index < respostaCorreta.length; index++) {

  if(respostaCorreta[index] === ' '){
    underscoreString += 'ㅤ'; //Adiciona espaço
  }
  else
  {
    underscoreString += '_ '; //Adiciona underscore
  }

}

// Exibe os underscores na div
$answerForQuestion.innerHTML = underscoreString;


verificaLetra();

}

function verificaLetra(){

  $keyBoardLetters.forEach(button => {

    button.addEventListener('click', () => {
      const letter = button.textContent;
      const answer = questions[currentQuestionIndex].answer;
      
      const isCorrect = answer.toLowerCase().includes(letter.toLowerCase());
      


      if(isCorrect){
        console.log('essa letra contém na palavra!');

        substituirUnderscorePorLetra(letter)

      }
      else{
        console.log('essa letra não contém na palavra!')

        hangMan();

        const todosRemovidos = Array.from($bodyBox).every(elemento => !elemento.querySelector(".hide"));
       

        if (todosRemovidos) {
          // Mostra uma mensagem para o usuário

          const resposta = confirm("Você perdeu! Deseja recomeçar ou ir para o próximo jogo?");

          if (resposta) {
            // Recomeça o jogo
            recomecarGame();
          } else {
            // Vai para o próximo jogo
            alert("vai para o próximo")
            proximoJogo();
            
            //displayQuestion();
          }
        }
      }

      if (!letrasUtilizadas.includes(letter)) {
        letrasUtilizadas.push(letter);

        $letterUsed.innerHTML = letrasUtilizadas.join(); // Atualiza a lista de letras utilizadas

        button.style.backgroundColor = 'blue';
        button.disabled = true;
    }  

  });
});

}

function limparEstadoBotoes() {
  $keyBoardLetters.forEach(button => {
    button.disabled = false;
    button.style.backgroundColor = ''; // Limpa a cor de fundo
  });
}


//Função que retira propriedade .hide de partes do boneco
function hangMan(){
    // Percorre todos os elementos dentro de $bodyBox
    $bodyBox.forEach(elemento => {
      const elementoComClasseHide = elemento.querySelector(".hide");
      // Se existe um elemento filho com a classe "hide"
      if (elementoComClasseHide) {
        // Remove a classe "hide" do elemento filho
        elementoComClasseHide.classList.remove("hide");
      }
    });
}

function substituirUnderscorePorLetra(letra) {
  // Encontra a resposta correta da pergunta atual
  const respostaCorreta = questions[currentQuestionIndex].answer;

  // Obtém a palavra correta e converte para minúsculas
  const palavraCorreta = respostaCorreta.toLowerCase();

  //Encontra todas as ocorrências da letra na palavra correta

  let indices = [];

  for(let i = 0; i < palavraCorreta.length; i++){
    if(palavraCorreta[i] === letra.toLowerCase()){
      indices.push(i);
    }
  }

  //Substitui os underscores nas posições correspondentes pelas letras

  for(let i = 0; i < indices.length; i++){
    const posicaoLetra = indices[i];

    underscoreString = underscoreString.substr(0, posicaoLetra * 2) + letra + underscoreString.substr(posicaoLetra * 2 + 1);

  }

  //Exibe a string atualizada com as letras na div
  $answerForQuestion.textContent = underscoreString;

}


function recomecarGame(){
  window.location.href = "index.html";
}



function proximoJogo() {

  //Verificado se o boneco não contém a classe hide para adicionar novamente
  $bodyBox.forEach(elemento => {
    const elementosFilhos = elemento.children;
    for (let i = 0; i < elementosFilhos.length; i++) {
        const filho = elementosFilhos[i];
        if (!filho.classList.contains("hide")) {
            filho.classList.add("hide");
        }
    }
});

limparEstadoBotoes();


$letterUsed.innerHTML = "";
underscoreString = '';
currentQuestionIndex++;

displayQuestion();


}













































































const questions = [
    {
      question: "Quem é o presidente do Brasil em 2024?",
      answer: "Lula"
    },
    {
      question: "Qual é o nome completo do personagem principal em Breaking Bad?",
      answer: "Walter White"
        
    },
    {
      question: "Quem é o criador da série Succession?",
      answer: "Jesse Armstrong"
    },
    {
      question: "Qual é o nome do mundo alternativo retratado em Stranger Things?",
      answers: "The Upside Down"
    }
  ];
