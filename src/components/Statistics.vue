<template>

  <div class="statistics">

    <button v-on:click="menu()" > &lt;- Меню </button>

    <div class="modes-container">
      <button v-on:click="setMode('mul')" v-bind:class="{ 'green-button': mode == 'mul' }" > Умножение </button>
      <button v-on:click="setMode('sum')" v-bind:class="{ 'green-button': mode == 'sum' }" > Сложение </button>
    </div>

    <table>
      <tr>
        <th>Имя</th>
        <th class="record-column">Рекорд</th>
        <th class="date-column">Дата</th>
      </tr>
      <tr v-for="row in leaders" v-bind:key="row.name">
        <td> {{ row.name }} </td>
        <td class="record-column"> {{ row.score }} </td>
        <td class="date-column"> {{ row.date }} </td>
      </tr>
    </table>

  </div>

</template>

<script>

import router from '../router'
import storage from '../storage/storage'
import { reactive, computed, ref, onMounted } from 'vue'

export default {
  name: 'StatisticsView',
  components: {
    
  },
  setup() {

    let statisticsByMode = reactive({})
    let mode = ref("mul")

    onMounted(async () => {
      for (let m of ["mul", "sum"]) {
        statisticsByMode[m] = await storage.loadOrDefault(m, [])
      }
    })

    let leaders = computed(() => {
      let statistics = statisticsByMode[mode.value]
      if (!statistics){
        return []
      }
      let response = []
      statistics = statistics.sort((a, b) => {
          if (a.name == b.name) {
            return b.score - a.score
          } else {
            return ('' + a.name).localeCompare(b.name)
          }
        });

      if (statistics.length > 0) {
        let currentName = statistics[0].name
        response.push(statistics[0])
        for (let i = 0; i < statistics.length; i++) {
          if (statistics[i].name != currentName) {
            currentName = statistics[i].name
            response.push(statistics[i])
          }
        }
      }

      return response.sort((a, b) => {
        return b.score - a.score
      })

    })

    const setMode = (newMode) => {
      mode.value = newMode
    }
    
    const menu = () => {
      router.push("/")
    }

    return {
      menu,
      mode,
      setMode,
      statisticsByMode,
      leaders
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    start(gameMode) {
      router.push("/game/" + gameMode)
    },
  }
}
</script>

<style scoped>


table {
  font-size: 32px;
  width: 100%;
  /* table-layout: fixed; */
}

th, td {
  padding: 10px;
  text-align: center;
  background-color: #EEE;
}

.record-column, .date-column {
  max-width: 200px;
  width: 10%;
}

button {
  font-size: 30px;
}

.modes-container {
  display: flex;
  justify-content: space-around;
  padding: 10px

}

.green-button {
  background-color: greenyellow;
}

</style>
