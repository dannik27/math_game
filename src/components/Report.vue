<template>

  <div class="report-box">

      <div class="report-controls">
        <button v-on:click="stop()" > &lt;- Меню </button>
        <div></div>
        <input type="text" placeholder="Имя" v-model="playerName" />      
        <button v-on:click="save()" > Сохранить </button>
      </div>  
      <div class="report-controls">
        <div> Счёт: {{ score }} </div>
      </div>  

      <div v-for="q in answeredQuestions" v-bind:key="q.id" v-bind:class="[(q.result == q.answer) ? 'green' : 'red']">
        <span> {{ q.a }} </span>
        <span> {{ q.operation }} </span>
        <span> {{ q.b }} </span>
        <span> = </span>
        <span> {{ q.answer }} </span>
        <span> ({{ q.result }}) </span>
      </div>
    </div>

</template>

<script>

import router from '../router'
import store from '../store'
import { computed } from 'vue'
import storage from '../storage/storage'
import { ref } from 'vue'

function expandToTwoDigits(item) {
  return item > 9 ? item : "0" + item;
}

function dateToString(date) {
  return (
    expandToTwoDigits(date.getDate()) +
    "." +
    expandToTwoDigits(date.getMonth() + 1) +
    "." +
    date.getFullYear()
  );
}

export default {
  name: 'GameReport',
  components: {
    
  },
  setup() {

    let playerName = ref("")

    const stop = function() {
      router.push("/")
    }

    const save = async function() {

      let statistics = await storage.loadOrDefault(store.gameMode, [])

      statistics.push({
        name: playerName.value,
        score: score.value,
        date: dateToString(new Date())
      })

      storage.save(store.gameMode, statistics)
      router.push("/statistics")
    }

    const answeredQuestions = computed(() => {
      return store.questions.filter(q => q.answer)
    });

    const score = computed (() => {
      let all = store.questions.filter(q => q.answer).length
      let correct = store.questions.filter(q => q.answer == q.result).length
      let wrong = all - correct

      console.log(correct)

      return correct - wrong
    });

    return {
      stop,
      save,
      score,
      answeredQuestions,
      playerName
    }
  },
}
</script>

<style scoped>

.report-controls {
    display: flex
}

.report-controls div {
    padding: 5px;
    font-size: 50px;
    flex-grow: 1
}

input {
  font-size: 30px;
  max-width: 150px;
}

button {
  font-size: 30px;
}

</style>
