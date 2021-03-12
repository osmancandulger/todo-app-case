<template>
  <body>
    <h1>Todo App</h1>

    <List></List>

    <p>Made with ❤️ for Related Digital!</p>
  </body>
</template>

<script>
import List from "./components/List.vue";

export default {
  name: "App",
  components: {
    List,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
// body {
//   display: flex;
//   width: 100%;
//   height: 100vh;
//   justify-content: center;
// }
</style>
