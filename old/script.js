
const TIMER_VALUE_INIT = 10

function randomNumber(a, b) {
  return a + Math.floor(Math.random() * (b - a));
}

const app = new Vue({
  el: '#app',
  data: {
    timerId: 0,
    timerValue: 10,
    state: 'settings',

    answerResult: "none",
    input: "0",

    currentQuestion: 0,

    keyboardButtons: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'],
    settings: {
      mul: {
        enabled: true,
        difficulty: 9
      },
      sum: {
        enabled: false,
        difficulty: 50
      },
      questionsLimit: 100,
      gameMode: "mul"
    },
    questions: [
      {
        a: 5,
        b: 6,
        answer: 123

      }
    ]
  },
  created() {
    window.addEventListener('keydown', this.onKeyPress);
  },
  computed: {
    question: function () {

      q = this.questions[this.currentQuestion]
      if (q) {
        return q.a + " " + q.operation + " " + q.b
      }
    },

    correctResult: function () {
      q = this.questions[this.currentQuestion]
      if (q) {
        return q.result
      }
    },

    score: function () {
      let correct = this.questions.filter(q => q.answer == q.result).length
      let wrong = this.currentQuestion - correct

      console.log(correct)

      return correct - 3 * wrong
    }
  },
  methods: {

    onKeyPress(e) {

      if (this.state != "main") {
        return e
      }

      if (this.keyboardButtons.includes(e.key)) {
        this.enterNumber(e.key)
      }

      if (e.key === "Backspace"){
        this.deleteNumber()
      }
      if (e.key === "Enter"){
        this.answer()
      }
    },

    generateQuestions() {
      this.questions = []
      for(let i = 0; i < this.settings.questionsLimit; i++) {

        if (this.gameMode == 'mul') {
          let a = randomNumber(2, 9)
          let b = randomNumber(2, 9)
          this.questions.push({
            a,
            b,
            operation: "*",
            result: a * b
          })
        } else {
          let a = randomNumber(10, 90)
          let b = randomNumber(1, 9)
          this.questions.push({
            a,
            b,
            operation: "+",
            result: a + b
          })
        }
      }
    },

    start(gameMode) {
      this.gameMode = gameMode
      this.generateQuestions()
      this.state = 'main'
      this.input = "0"
      this.currentQuestion = 0
      this.timerValue = TIMER_VALUE_INIT
      this.timerId = setInterval(() => this.updateTimer(), 1000)
    },

    stop() {
      this.state = 'settings'
      clearInterval(this.timerId)
    },
  
    updateTimer() {
      this.timerValue = this.timerValue - 1
      if (this.timerValue == 0) { 
        clearInterval(this.timerId)
      }
    },

    answer() {

      if (this.answerResult != "none") {

        if (this.timerValue <= 0) {
          this.showReport()
        }

        this.currentQuestion += 1
        this.answerResult = "none"
        this.input = "0"
        return
      }

      let q = this.questions[this.currentQuestion]

      if ( this.input == q.result ) {
        this.answerResult = "correct"
      } else {
        this.answerResult = "wrong"
      }

      q.answer = this.input

    },

    showReport() {
      this.state = "report"
    },

    enterNumber(char) {
      if ( this.answerResult != "none" ) {
        return
      }
    
      if (this.input === "0") {
        this.input = char
      } else {
        this.input = this.input + char
      }
    },

    deleteNumber() {
      if ( this.answerResult != "none" ) {
        return
      }
    
      if (this.input.length === 1) {
        this.input = "0"
      } else {
        this.input = this.input.substring(0, this.input.length - 1)
      }
    }
  },
})