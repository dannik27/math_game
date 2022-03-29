// let input_field = document.getElementById("answer")
// let question_field = document.getElementById("question")
// let result_field = document.getElementById("result-box")
// let box = document.getElementById("box")
// let start_button = document.getElementById("start-button")
// let answer_button = document.getElementById("answer-button")
// let report_box = document.getElementById("report-box")
// let timer_box = document.getElementById("timer-box")
// let main_box = document.getElementById("main")
// let settings_box = document.getElementById("settings")

// const TIMER_VALUE_INIT = 10

// let difficulty = 7
// let stagesCount = 100

// let timer_value = TIMER_VALUE_INIT
// let timer_id = 0

// let questions = []
// let stage = 0

// let error = false

// let input = "0"


// // document.onkeydown = function(e) {
// //   if (e.which >= 95 && e.which <= 105){
// //     updateInput("" + (e.which - 96))
// //   }
// //   if (e.which == 8){
// //     updateInput("<")
// //   }
// //   if (e.which == 13){
// //     answer()
// //   }

// // console.log(e.which)
// // return e;
// // };

// function randomNumber(a, b) {
//   return a + Math.floor(Math.random() * (b - a));
// }

// function toSettings() {
//   main_box.style.display = "none"
//   settings_box.style.display = "block"
//   clearInterval(timer_id)
// }

// function updateInput(char) {

//   if ( error ) {

//     return

//   }

//   if (char === "<") {
    
//     if (input.length === 1) {
//       input = "0"
//     } else {
//       input = input.substring(0, input.length - 1)
//     }
//     // input_field.textContent = input
//     return
//   }

//   if (input === "0") {
//     input = char
//   } else {
//     input = input + char
//   }

//   // input_field.textContent = input

// }

// function updateQuestion() {
//   value = questions[stage].a + " * " + questions[stage].b
//   question_field.textContent = value
// }

// function start() {

//   questions = []
//   stage = 0

//   for (let i = 0; i < stagesCount; i++) {
//     a = randomNumber(2, difficulty)
//     b = randomNumber(2, difficulty)
//     result = a * b
//     questions.push({a, b, result})
//   };
  
  
//   updateQuestion()
  
//   main.style.display = "block"
//   settings_box.style.display = "none"
//   // result_field.style.display = "none"
  
//   answer_button.textContent = ">>"
//   answer_button.style.backgroundColor = "#EEE"

//   timer_box.style.display = "block"
//   timer_value = TIMER_VALUE_INIT
//   timer_id = setInterval(() => updateTimer(), 1000)

// }

// function updateTimer() {

//   timer_value = timer_value - 1
//   timer_box.textContent = timer_value

//   if (timer_value == 0) { 
//     clearInterval(timer_id)
//   }
 
// }

// function answer() {
    
//   if (error) {
//     nextStage()
//     return
//   }

//   let q = questions[stage]
//   if ( input == q.result ) {
//     answer_button.textContent = "+"
//     answer_button.style.backgroundColor = "#4C6"
  
//     // result_field.textContent = q.result
//     result_field.style.backgroundColor = "#4C6"

//     error = true
//   } else {
//     answer_button.textContent = "-"
//     answer_button.style.backgroundColor = "red"

//     // result_field.textContent = q.result
//     result_field.style.backgroundColor = "red"   

//     error = true
//   }

//   result_field.style.display = "block"

//   q.answer = input

 
 
// }

// function nextStage() {
  
//   if (stage === stagesCount -1 || timer_value == 0) {
//     settings_box.style.display = "block"
//     report_box.style.display = "block"
//     timer_box.style.display = "none"
//     main.style.display = "none"

    
//     score = 0

//     for (let i = 0; i <= stage; i++) {
//       q = questions[i]
 
//       const span = document.createElement('div')

    
//       if (q.result == q.answer) {
//         span.textContent = q.a + " * " + q.b + " = " + q.result
//         span.style.backgroundColor = "#4C6"
   
//         score += 1

//       } else {
//         span.textContent = q.a + " * " + q.b + " = " + q.answer + " (" + q.result + ")"
//         span.style.backgroundColor = "red"

//         score -= 3
//       }        
 

      
 
//       report_box.appendChild(span)
      
//     }

//     const scoreSpan = document.createElement('div')
//     scoreSpan.textContent = score
//     scoreSpan.style.fontSize = "80px"
//     scoreSpan.style.backgroundColor = "#CCC"
//     report_box.appendChild(scoreSpan)
        


//   } else {
//     // result_field.style.display = "none"

//     answer_button.textContent = ">>"
//     answer_button.style.backgroundColor = "#EEE"

//     stage = stage + 1

//     updateQuestion()
//   }

  

//   error = false
 
//   input = "0"
//   // input_field.textContent = input
// }


// updateInput("0")


const TIMER_VALUE_INIT = 5

function randomNumber(a, b) {
  return a + Math.floor(Math.random() * (b - a));
}

const app = new Vue({
  el: '#app',
  data: {
    timerId: 0,
    timerValue: TIMER_VALUE_INIT,
    state: 'settings',
    showAnswer: false,
    currentQuestionId: 0,
    settings: {
      mul: {
        enabled: true,
        difficulty: 9
      },
      sum: {
        enabled: false,
        difficulty: 50
      },
    },
    questions: [],
    input: "0",
    answerButton: {
      content: ">>",
      color: "#EEE"
    },
    resultBox: {
      content: "",
      color: "#EEE"
    },
    score: 0
  },
  computed: {
    currentQuestion: function() {
      if (this.questions.length > 0 && this.currentQuestionId < this.questions.length) {
        return this.questions[this.currentQuestionId]
      } else {
        return {
          a: 0,
          b: 0
        }
      }
    }
  },
  methods: {

    generateQuestions() {
      this.questions = []
      for(let i = 0; i < 100; i++) {
        
        a = randomNumber(2, this.settings.mul.difficulty)
        b = randomNumber(2, this.settings.mul.difficulty)

        this.questions.push({
          a,
          b,
          operation: "*",
          result: a * b
        })
      }
    },

    start() {
      this.generateQuestions()
      this.state = 'main'
      this.timerId = setInterval(() => this.updateTimer(), 1000)
      this.showAnswer = false
      this.input = "0"
      this.answerButton.content = ">>"
      this.answerButton.color = "#EEE"
    },

    stop() {
      this.state = 'settings'
      clearInterval(this.timerId)
      this.timerValue = TIMER_VALUE_INIT
    },
  
    updateTimer() {
      this.timerValue = this.timerValue - 1
      if (this.timerValue == 0) { 
        clearInterval(this.timerId)
      }
    },

    answer() {
      if (this.showAnswer) {

        if (this.currentQuestionId == this.questions.length - 1 || this.timerValue == 0) {
          this.state = 'report'
          this.score = this.questions.filter(q => q.answer == q.result).length
          return
        }

        this.showAnswer = false
        this.answerButton.content = ">>"
        this.answerButton.color = "#EEE"
        this.input = "0"
        this.currentQuestionId += 1
        return
      }
    
      let question = this.questions[this.currentQuestionId]
      if ( this.input == question.result ) {
        this.answerButton.content = "+"
        this.answerButton.color = "#4C6"
      
        this.resultBox.content = question.result
        this.resultBox.color = "#4C6"
    
      } else {

        this.answerButton.content = "-"
        this.answerButton.color = "red"
    
        this.resultBox.content = question.result
        this.resultBox.color = "red"   
    
      }
    
      question.answer = parseInt(this.input)

      this.showAnswer = true
    },

    updateInput(char) {

      if ( this.showAnswer ) {
        return
      }
    
      if (char === "<") {
        
        if (this.input.length === 1) {
          this.input = "0"
        } else {
          this.input = this.input.substring(0, this.input.length - 1)
        }
        return
      }

    
      if (this.input === "0") {
        this.input = char
      } else {
        this.input = this.input + char
      }
        
    }
  },
  mounted() {
    document.onkeydown = (e) => {
      if (e.key >= 0 && e.key <= 9){
        this.updateInput("" + (e.key))
      }
      if (e.key == 'Backspace'){
        this.updateInput("<")
      }
      if (e.key == "Enter"){
        this.answer()
      }
    
      console.log(e.key)
      return e;
    };
  }
})