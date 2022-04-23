<template>

  <div class="menu">
    <button v-on:click="start('mul')"> Умножение </button>
    <button v-on:click="start('sum')"> Сложение </button>
    <button v-on:click="statistics()"> <FontAwesomeIcon icon="crown"/> </button>
  </div>

</template>

<script>

import router from '../router'


export default {
  name: 'MainMenu',
  components: {
    
  },
  data: function() {
    return {
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

    statistics() {
      router.push("/statistics")
    }
  }
}
</script>

<style scoped>

.menu {
  padding: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 1em;
}

button {
  padding: 40px;
  font-size: 50px;
}

.menu button:nth-child(1), .menu button:nth-child(2) {
  grid-column-start: 1;
  grid-column-end: 5;
}
</style>
