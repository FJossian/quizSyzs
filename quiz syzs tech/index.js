const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "O que e aplicado na superfície do processador ou em outros componentes? Ela tem poder termo condutor.",
    answers: [
      { text: "periféricos.", correct: false },
      { text: "pasta térmica.", correct: true },
      { text: "ram.", correct: false },
      { text: "cache.", correct: false }
    ]
  },
  {
    question: "Qual o principal componente físico de um computador.?",
    answers: [
      { text: "CPU.", correct: false },
      { text: "Placa mãe.", correct: false },
      { text: "memória ROM.", correct: false },
      { text: "processador", correct: true }
    ]
  },
  {
    question: 'Onde instalar um pente de memória RAM no computador?"',
    answers: [
      { text: 'BIOS.', correct: false },
      { text: 'Microsoft.', correct: false },
      { text: 'slots de expansão.', correct: true },
      { text: "memória ROM.", correct: false }
    ]
  },
  {
    question: 'O que você deve fazer se o seu computador não inicializar corretamente?',
    answers: [
      { text: "Nunca verificar a integridade do disco rígido.", correct: false },
      { text: "Ignorar mensagens de erro durante o processo de inicialização.", correct: false },
      { text: "Tentar inicializar a partir de um dispositivo externo, como um pendrive ou disco de recuperação.", correct: true },
      { text: "Nunca atualizar o sistema operacional.", correct: false }
    ]
  },
  {
    question: 'Quais os dois itens devem ser utilizado para realizar o teste de uma fonte de alimentação de um computador?',
    answers: [
      { text: ' RJ45 e cabo sata.', correct: false },
      { text: 'Multímetro e voltímetro.', correct: true },
      { text: 'Multímetro e clip.', correct: false },
      { text: 'adaptador e clipador de cabos.', correct: false }
    ]
  },
  {
    question: 'Qual é uma prática recomendada para manter um computador funcionando sem problemas?',
    answers: [
      { text: 'Desligar o computador sempre que não estiver em uso.', correct: true },
      { text: 'Deixar o computador ligado 24 horas por dia.', correct: false },
      { text: 'Ignorar atualizações de software.', correct: false },
      { text: 'Não limpar o computador por dentro regularmente.', correct: false }
    ]
  },
  {
    question: 'Qual é a melhor maneira de evitar superaquecimento em um computador?',
    answers: [
      { text: 'Bloquear todas as saídas de ar do computador.', correct: false },
      { text: 'Usar um cooler adicional para aumentar o calor interno.', correct: false },
      { text: 'Manter o ambiente ao redor do computador fresco e ventilado.', correct: true },
      { text: 'Ignorar a limpeza regular dos ventiladores e dissipadores de calor.', correct: false },
    ]
  },
  {
    question: 'O que você deve fazer se o seu computador estiver apresentando lentidão?',
    answers: [
      { text: 'Reinicie o computador', correct: true },
      { text: 'Desinstale o antivírus.', correct: false },
      { text: 'Jogue-o pela janela.', correct: false },
      { text: 'Aumente a resolução da tela.', correct: false },
    ]
  },
  {
    question: ' Qual dos seguintes componentes armazena permanentemente os dados no computador, mesmo quando ele está desligado?',
    answers: [
      { text: 'Memória RAM.', correct: false },
      { text: ' Disco Rígido (HD).', correct: true },
      { text: ' Placa-Mãe.', correct: false },
      { text: 'Fonte de Alimentação.', correct: false },
    ]
  },
  {
    question: ' Como você pode prolongar a vida útil do disco rígido do seu computador?',
    answers: [
      { text: 'Nunca fazer backups de dados.', correct: false },
      { text: 'Deixar o disco rígido funcionar continuamente sem descanso.', correct: false },
      { text: 'Evitar a desfragmentação regular do disco rígido.', correct: false },
      { text: ' Fazer backups regulares e evitar movimentos bruscos enquanto o disco está em uso.', correct: true },
    ]
  },
]