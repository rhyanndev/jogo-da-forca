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

let currentQuestionIndex = 0;


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


//Pegar a letra de cada answer e colocar span com o _ e  mostrar na div answerForQuestion

$answerForQuestion.textContent = "";

const respostaCorretaSemAcento = respostaCorreta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

Array.from(respostaCorretaSemAcento).forEach((letter) =>
{
  const span = document.createElement("span");

  span.textContent = "_";

  span.setAttribute("answer", letter.toUpperCase());

  $answerForQuestion.appendChild(span);

  span.style.marginRight = '5px';

});

verificaLetra();

}

function verificaLetra() {
  $keyBoardLetters.forEach(button => {
    button.onclick = function() {
      const letter = this.textContent; // 'this' refere-se ao botão clicado

      this.style.backgroundColor = 'red';
      this.disabled = true;

      const arr = document.querySelectorAll(`[answer="${letter}"]`);

      if (!arr.length) {
        wrongAnswer();
        console.log('essa letra não contém na palavra!');
      }

      arr.forEach((e) => {
        e.textContent = letter;
      });

      const spans = document.querySelectorAll('.answer span');
      const won = !Array.from(spans).find((span) => span.textContent === '_');

      if (won) {
        setTimeout(() => {
          alert('Ganhou!');
          proximoJogo();
        }, 100);
      }

      if (!letrasUtilizadas.includes(letter)) {
        letrasUtilizadas.push(letter);
        $letterUsed.innerHTML = letrasUtilizadas.join(); // Atualiza a lista de letras utilizadas
      }
    };
  });
}


function wrongAnswer() {

  hangMan();

  console.log('Chamada da função wrongAnswer()');

 const todosRemovidos = Array.from($bodyBox).every(elemento => !elemento.querySelector(".hide"));

  if (todosRemovidos) {
    setTimeout(() => {
      alert(`Perdeu :/ a respota era ${questions[currentQuestionIndex].answer}`);
      proximoJogo();
    }, 100);
  }
}

function limparEstadoBotoes() {
  $keyBoardLetters.forEach(button => {
    button.disabled = false;
    button.style.backgroundColor = ''; // Limpa a cor de fundo
  });
}

function hangMan() {
  const bodyParts = document.querySelector('.body-box .hide');
  if (bodyParts) {
    bodyParts.classList.remove('hide');
  }
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
currentQuestionIndex = Math.floor(Math.random() * questions.length);

displayQuestion();

}













































































const questions = [
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    answer: "Júpiter"
  },
  {
    question: "Qual é o nome da montanha mais alta do mundo?",
    answer: "Everest"
  },
  {
    question: "Qual é o elemento químico mais abundante no universo?",
    answer: "Hidrogênio"
  },
  {
    question: "Qual é a capital da França?",
    answer: "Paris"
  },
  {
    question: "Qual é a maior ilha do mundo?",
    answer: "Groenlândia"
  }
];
