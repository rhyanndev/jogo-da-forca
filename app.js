const $questionText = document.querySelector(".question");
const $startGameButton = document.querySelector(".start-quiz");
const $containerLeft = document.querySelector(".container-side-left");
const $containerRight = document.querySelector(".container-side-right");
const $keyBoardContent = document.querySelector(".container-keyboard"); 
const $keyBoardLetters = document.querySelectorAll('.key');


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

  $keyBoardLetters.forEach(button => {

    button.addEventListener('click', () => {
      const letter = button.textContent;
      const question = questions[currentQuestionIndex];

      const isCorrect = question.answers.some(answers => {
        return answers.correct && answers.text.toLowerCase().includes(letter.toLowerCase());
      });

      if(isCorrect){
        alert('essa letra contém na palavra!');
      }
      else{
        alert('essa letra não contém na palavra!')
      }
      
  });


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
    },
    {
      question: "Qual é o nome completo do personagem principal em Breaking Bad?",
      answers: [
        { text: "Walter White", correct: true },
        { text: "Jesse Pinkman", correct: false },
        { text: "Saul Goodman", correct: false },
        { text: "Gustavo Fring", correct: false }
      ]
    }
  ];
