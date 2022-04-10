<template>

  <div class="statistics">

    <button v-on:click="menu()" > &lt;- Меню </button>

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

export default {
  name: 'StatisticsView',
  components: {
    
  },
  setup() {

    let leaders = []
    let statistics = storage
        .loadOrDefault("mul", [])
        .sort((a, b) => {
          if (a.name == b.name) {
            return b.score - a.score
          } else {
            return ('' + a.name).localeCompare(b.name)
          }
        });

    console.log("---")
    console.log(statistics)

    if (statistics.length > 0) {
      let currentName = statistics[0].name
      leaders.push(statistics[0])
      for (let i = 0; i < statistics.length; i++) {
        console.log("+")
        console.log(statistics[i].name)
        if (statistics[i].name != currentName) {
          currentName = statistics[i].name
          leaders.push(statistics[i])
        }
      }
    }

    leaders = leaders.sort((a, b) => {
      return b.score - a.score
    })

    console.log("|||")
    console.log(leaders)
    
    const menu = () => {
      router.push("/")
    }

    return {
      menu,
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

<style>


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

</style>
