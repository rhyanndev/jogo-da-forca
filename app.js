const $questionText = document.querySelector(".question");
const $startGameButton = document.querySelector(".start-quiz");

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


$startGameButton.addEventListener("click", startGame);

let currentQuestionIndex = 0;


function startGame (){


  if($userName.value.trim() === ""){
    alert('Preencha seu nome!');
}

  else{

    const playUser = $userName.value;

  
    $startGameButton.classList.add("hide");
    $userField.classList.add("hide");
    $containerLeft.classList.remove("hide");
    $containerRight.classList.remove("hide");
    $playersName.textContent = `Jogador: ${playUser.toUpperCase()}`
  
    displayQuestion();  
}

}

function displayQuestion() {

// Exibe o texto da pergunta atual
$questionText.textContent = questions[currentQuestionIndex].question;


function contarLetras(objeto){

  let totalLetras = 0;

    objeto.answers.forEach(answers => {
      if (answers.correct){
        totalLetras += answers.text.replace(/ /g, '').length; // Ignorar espaços na contagem
      }
    });

  return totalLetras;

}
const totalLetras = contarLetras(questions[currentQuestionIndex]);
console.log("Total de letras nessa resposta:", totalLetras);



const respostaCorreta = questions[currentQuestionIndex].answers.find(answer => answer.correct);

for (let index = 0; index < respostaCorreta.text.length; index++) {
  
  if(respostaCorreta.text[index] === ' '){
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

  let letrasUtilizadas = [];

  $keyBoardLetters.forEach(button => {

    button.addEventListener('click', () => {
      const letter = button.textContent;
      const question = questions[currentQuestionIndex];

      const isCorrect = question.answers.some(answers => {
        return answers.correct && answers.text.toLowerCase().includes(letter.toLowerCase());
      });

      

      if(isCorrect){
        alert('essa letra contém na palavra!');

        substituirUnderscorePorLetra(letter)

      }
      else{
        alert('essa letra não contém na palavra!')

        // Percorre todos os elementos dentro de $bodyBox
        $bodyBox.forEach(elemento => {
          const elementoComClasseHide = elemento.querySelector(".hide");
          // Se existe um elemento filho com a classe "hide"
          if (elementoComClasseHide) {
            // Remove a classe "hide" do elemento filho
            elementoComClasseHide.classList.remove("hide");
          }
        });


        const todosRemovidos = Array.from($bodyBox).every(elemento => !elemento.querySelector(".hide"));

        if (todosRemovidos) {
          // Mostra uma mensagem para o usuário
          const resposta = confirm("Você perdeu! Deseja recomeçar ou ir para o próximo jogo?");
          if (resposta) {
            // Recomeça o jogo
            recomeçarGame ();
          } else {
            // Vai para o próximo jogo
            //proximoJogo();
            alert("vai para o próximo")
          }
        }


      }   

      button.style.backgroundColor = 'red';
      button.disabled = true;
      
      if (!letrasUtilizadas.includes(letter)) {
        letrasUtilizadas.push(letter);

        $letterUsed.innerHTML = letrasUtilizadas.join(', '); // Atualiza a lista de letras utilizadas
    }

  });
});

}


function substituirUnderscorePorLetra(letra) {
  // Encontra a resposta correta da pergunta atual
  const respostaCorreta = questions[currentQuestionIndex].answers.find(answer => answer.correct);

  // Obtém a palavra correta e converte para minúsculas
  const palavraCorreta = respostaCorreta.text.toLowerCase();

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


function recomeçarGame () {


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
