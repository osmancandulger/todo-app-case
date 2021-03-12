<template>
  <div id="modal" class="modal-vue">
    <button id="myBtn" @click="openModal = true">Open Modal</button>
    <!-- overlay -->
    <div class="overlay" v-if="openModal" @click="openModal = false"></div>
    <!-- modal -->
    <div class="modal" v-if="openModal">
      <button class="close" @click="openModal = false">x</button>
      <h3>Title</h3>
      <p>Description</p>
    </div>
   
  </div>
</template>

<script>
export default {
  el: "#modal",
  data() {
    return {
      openModal: false,
    };
  },
  mounted() {
    
  },
  methods: {
    showModal: function() {
      modal.style.display = "block";
    },
   
  },
};
</script>

<style>
.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .modal {
  position: relative;
  width: 300px;
  z-index: 9999;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
