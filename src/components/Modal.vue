<template>
  <div id="modal" class="modal-vue">
    <button id="myBtn" @click="openModal = true">Open Modal</button>
    <!-- overlay -->
    <div class="overlay" v-if="openModal" @click="openModal = false"></div>
    <!-- modal -->
    <div class="modal" v-if="openModal">
      <button class="close" @click="openModal = false">x</button>

      <!-- <p v-for="(item, i) in sortedList" :key="item.id">{{ item.id }}</p> -->
      <label for="input">Title: </label>
      <input type="text" class="input" v-model="sortedList[0].title" />
    </div>
  </div>
</template>

<script>
import List from "./List";
export default {
  el: "#modal",
  components: { List },
  data() {
    return {
      openModal: false,
    };
  },
  props: ["sortedList", "openModal"],
  mounted() {},
  methods: {
    showModal: function() {
      modal.style.display = "block";
    },
  },
};
</script>

<style scoped lang="scss">
.modal-vue {
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  border: 2px solid green;
  .overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    position: relative;
    width: 300px;
    z-index: 9999;
    margin: auto auto;
    padding: 20px 30px;
    background-color: #fff;
    border: 2px solid red;
    overflow: auto;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  #myBtn {
    position: relative;
    margin-top: 432px;
    z-index: 10000;
    margin-left: 50%;
    margin-bottom: 15%;
  }
}
</style>
