<template>
  <body>
    <h1>Todo App</h1>

    <!-- <div class="loader-container">
      <div class="loader" v-if="this.loading"></div>
    </div> -->
    <List v-if="!this.loading" />
    <p>Made with ❤️ for Related Digital!</p>
  </body>
</template>

<script>
import List from "./components/List.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    List,
    Modal,
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
body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.loader-container {
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
  top: 45px;
  height: 100vh;
}
.loader {
  width: 120px;
  height: 120px;
  border: 15px solid #f3f3f3;
  border-radius: 50%;
  border-top: 15px solid #d8fcfc;
  border-right: 15px solid #c1e0d7;
  border-right: 15px solid #e0f7ea;
  animation: spin 0.4s linear infinite;
  margin-bottom: 95px;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
