const $questionText = document.querySelector(".question");
const $startGameButton = document.querySelector(".start-quiz");
const $containerLeft = document.querySelector(".container-side-left");
const $containerRight = document.querySelector(".container-side-right");
const $keyBoardContent = document.querySelector(".container-keyboard"); 


$startGameButton.addEventListener("click", startGame);

let currentQuestionIndex = 0;


function startGame (){

  $startGameButton.classList.add("hide");
  $containerLeft.classList.remove("hide");
  $containerRight.classList.remove("hide");

  displayQuestion();
    
}

function displayQuestion() {

// Exibe o texto da pergunta atual
$questionText.textContent = questions[currentQuestionIndex].question;

verificaLetra();

}

function verificaLetra(){
  // Adiciona um ouvinte de evento de clique para o conteúdo do teclado
$keyBoardContent.addEventListener('click', function(event){
  // Verifica se o elemento clicado é um botão
  if(event.target.classList.contains('key')){
    const textoBotao = event.target.textContent; // Obtém o texto do botão clicado

    
    // Obtém a pergunta atual
    const currentQuestion = questions[currentQuestionIndex];

    // Verifica se a letra digitada está contida no texto de qualquer resposta correta da pergunta atual
    const respostaCorreta = currentQuestion.answers.some(answer => {
      return answer.text.includes(textoBotao) && answer.correct;
    });

    // Se uma resposta correta contendo a letra digitada foi encontrada, exibe um alerta
    if (respostaCorreta) {
      alert("Essa letra está contida em uma resposta correta!");
      
    }
  }
});
}












































































const questions = [
    {
      question: "Quem é o presidente do Brasil em 2024??",
      answers: [
        { text: "Lula", correct: true },
        { text: "Bolsonaro", correct: false },
        { text: "Dilma", correct: false },
        { text: "Michel Temer", correct: false }
      ]
    }
  ];
