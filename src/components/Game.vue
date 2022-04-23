<template>

  <div>
    <div class="left">
      

      
      <button class="menu-button" v-on:click="stop()" > &lt;- Меню </button>
      <div class="timer"> {{ timerValue }} </div>
       


  
      <div class="question" id="question" >
          <span> {{ question }} </span>
          <span v-if="answerResult != 'none'"> = {{ correctResult }} </span>

      </div>
  

    
      <div class="answer" id="answer" v-bind:class="{red: (answerResult == 'wrong'), green: (answerResult == 'correct')}">
      {{ input }}
      </div>

      <button class="keyboard-button" v-for="button in keyboardButtons" v-bind:key="button"  v-on:click="enterNumber(button)" > {{ button }}</button>
      <button class="keyboard-button" v-on:click="deleteNumber()" > &lt; </button>
    
      <button class="answer-button" v-on:click="answer()" v-bind:class="{red: (answerResult == 'wrong'), green: (answerResult == 'correct')}"> Ответ </button>
    
      
    </div>
  </div>

</template>

<script>

import router from '../router'
import store from '../store'
import { onMounted, onUnmounted, ref, computed } from "vue";

const TIMER_VALUE_INIT = 60
const QUESTIONS_LIMIT = 100

function randomNumber(a, b) {
  return a + Math.floor(Math.random() * (b - a));
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export default {
  name: 'GameView',
  props: ["gameMode"],
  components: {
    
  },
  setup(props) {

    const keyboardButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

    let timerId = 0;
    let currentQuestion = ref(0);

    let timerValue = ref(10);
    let answerResult = ref("none");
    let input = ref("0");

    let questions = store.questions;
    // eslint-disable-next-line vue/no-setup-props-destructure
    store.gameMode = props.gameMode

    const question = computed(() => {
      let q = questions[currentQuestion.value]
      if (q) {
        return q.a + " " + q.operation + " " + q.b
      } else {
        return ""
      }
    });

    const correctResult = computed(() => {
      let q = questions[currentQuestion.value]
      if (q) {
        return q.result
      } else {
        return ""
      }
    });
    
    const stop = () => {
      clearInterval(timerId)
      router.push("/")
    }

    const updateTimer = () => {
      timerValue.value = timerValue.value - 1
      if (timerValue.value == 0) { 
        clearInterval(timerId)
      }
    }

    const enterNumber = (char) => {
      console.log(input)
      if ( answerResult.value != "none" ) {
        return
      }
    
      if (input.value === "0") {
        input.value = char
      } else {
        input.value = input.value + char
      }
    }

    const deleteNumber = () => {
      if ( answerResult.value != "none" ) {
        return
      }
    
      if (input.value.length === 1) {
        input.value = "0"
      } else {
        input.value = input.value.substring(0, input.value.length - 1)
      }
    }

    const answer = () => {

      if (answerResult.value != "none") {

        if (timerValue.value <= 0) {
          showReport()
        }

        currentQuestion.value += 1
        answerResult.value = "none"
        input.value = "0"
        return
      }

      let q = questions[currentQuestion.value]

      if ( input.value == q.result ) {
        answerResult.value = "correct"
      } else {
        answerResult.value = "wrong"
      }

      q.answer = input.value

    }

    const showReport = () => {
      router.push("/report")
    }

    const onKeyPress = (e) => {

      // if (this.state != "main") {
      //   return e
      // }

      if (keyboardButtons.includes(e.key)) {
        enterNumber(e.key)
      }

      if (e.key === "Backspace"){
        deleteNumber()
      }
      if (e.key === "Enter"){
        answer()
      }
    }

    const generateQuestions = () => {
      questions.length = 0 

      if (props.gameMode == 'mul') {

        let data = []

        for (let i = 2; i < 10; i++) {
            for (let j = 2; j < i; j++) {
                data.push([i, j])
                data.push([j, i])
            }
            data.push[i, i]
        }


        let result = []

        for (let i = 0; i < 25; i++) {
          let found = false
          while (!found) {
            let indexInBlock = randomNumber(0, 3)
            let indexInArray = i * 2 + indexInBlock
            if (!result.includes(indexInArray)) {
              result.push(indexInArray)
              found = true
            }
          }
        }

        let other = []

        for (let i = 40; i < data.length; i++) {
          if (! result.includes(i)) {
            other.push(i)
          }
        }

        shuffleArray(other)

        result = result.concat(other)

        for (let index of result) {
          let a = data[index][0]
          let b = data[index][1]
          questions.push({
            id: index,
            a,
            b,
            operation: "*",
            result: a * b
        })
        }

      } else {
        for(let i = 0; i < QUESTIONS_LIMIT; i++) {
          let a = randomNumber(0, 9) * 10 + randomNumber(5, 9)
          let b = randomNumber(0, 9) * 10 + randomNumber(5, 9)
          questions.push({
            id: i,
            a,
            b,
            operation: "+",
            result: a + b
          })
        }
      }
    }

    onMounted(() => {
      generateQuestions()
      input.value = "0"
      currentQuestion.value = 0
      timerValue.value = TIMER_VALUE_INIT
      timerId = setInterval(() => updateTimer(), 1000)
      window.addEventListener('keydown', onKeyPress);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', onKeyPress);
    })


    return {
      keyboardButtons,
      timerValue,
      answerResult,
      input,

      question,
      correctResult,

      stop,
      enterNumber,
      deleteNumber,
      answer
    }
  }
}
</script>

<style scoped>

.main-controls div {
  margin-left: 50px;
  padding: 10px;
  font-size: 50px;
}

.timer {
  font-size: 50px;
  align-self: center;
  justify-self: center;
  grid-column-start: 3;
  grid-column-end: 4;
}

.left {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 1em;
}

.left div:nth-child(3), .left div:nth-child(4), .left button:nth-child(16) {
  grid-column-start: 1;
  grid-column-end: 4;
}

.keyboard-button, .answer-button {
  font-size: 50px;
}

.menu-button {
  font-size: 30px;
}

</style>
