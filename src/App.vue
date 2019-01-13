<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Abel", "Lato", sans-serif;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex-direction: column;
}
</style>
