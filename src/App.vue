<template>

    <router-view></router-view>

</template>



<script>

export default {
  name: 'App',
  components: {
    
  },
  data: function() {
    return {
      
    }
  },
}
</script>

<style>
.box {
  background-color: #CCC;
}


.question {
  font-size: 100px;
  display: block;
  white-space: nowrap;
  word-break: keep-all;
  text-align: center;
}

.answer {
  font-size: 80px;
  text-align: center;
}


.answer-button {
  background-color: #EEE;
}

.result-box {
  display: none;
  background-color: #4C6;
  font-size: 100px;
  margin-left: 50px;
}

.report-box {
  background-color: #ccc;
  font-size: 60px
}



.red {
  background-color: red;
}

.green {
  background-color: #4C6;
}

.main-controls {
    display: flex
}




</style>
