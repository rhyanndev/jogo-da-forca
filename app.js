const $questionText = document.querySelector(".question");
const $startGameButton = document.querySelector(".start-quiz");
const $containerLeft = document.querySelector(".container-side-left");
const $containerRight = document.querySelector(".container-side-right");
const $keyBoardContent = document.querySelector(".container-keyboard"); 
const $keyBoardLetters = document.querySelectorAll('.key');
const $answerForQuestion = document.querySelector('.answer');


$startGameButton.addEventListener("click", startGame);

let currentQuestionIndex = 1;


function startGame (){

  $startGameButton.classList.add("hide");
  $containerLeft.classList.remove("hide");
  $containerRight.classList.remove("hide");

  displayQuestion();
    
}

function displayQuestion() {

// Exibe o texto da pergunta atual
$questionText.textContent = questions[currentQuestionIndex].question;


function contarLetras(objeto){

  let totalLetras = 0;

    objeto.answers.forEach(answers => {
      if (answers.correct){
        totalLetras += answers.text.length;
      }
    });

  return totalLetras;

}
const totalLetras = contarLetras(questions[currentQuestionIndex]);
console.log("Total de letras nessa resposta:", totalLetras);

let underscoreString = '';
for (let index = 0; index < totalLetras; index++) {
  underscoreString += '_ ';
}

// Exibe os underscores na div
$answerForQuestion.innerHTML = underscoreString;


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
