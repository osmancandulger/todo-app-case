<template>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <div id="table">
    <table>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Assignee</th>
        <th class="status" @click="sort('completed')">
          Status
          <span class="material-icons">
            arrow_drop_down
          </span>
        </th>
        <th>Actions</th>
      </tr>
      <tr v-for="(item, index) in sortedList" :key="item.id">
        <td>{{ item.id }}</td>
        <td
          class="title"
          contenteditable="true"
          v-on:keydown.enter="updateTask($event, list)"
          @blur="updateTask($event, list)"
        >
          {{ item.title }}
        </td>
        <td>{{ item.name }}</td>
        <td v-if="item.completed" :sortedList="sortedList">Done</td>
        <td v-else>In Progress</td>
        <td class="table-buttons">
          <!-- <button
            class="edit-button"
            @click="
              editChart();
              openModal = true;
              this.openModal = true;
            "
          >
            Edit
          </button> -->

          <button @click="updateStatus()">Change Status</button>
          <button @click="editTitle()">Edit Title</button>
          <button class="delete-button" @click="removeChart(index)">
            Delete
          </button>
        </td>
      </tr>
    </table>

    <Modal :sortedList="sortedList" v-if="openModal" />

    <button @click="prevPage">Prev</button>
    <button @click="nextPage">Next</button>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import { deleteTaskFromApi, getDataFromApi } from "./data";
import { API_URL, USER_URL } from "./constants";

export default {
  el: "#table",
  components: {
    Navigator,
    Modal,
    getDataFromApi,
  },
  props: ["openModal", "getDataFromApi"],
  data() {
    return {
      loading: true,
      openModal: false,
      list: [],
      userList: [],
      editTitle: this.editTitle,
      checked: false,
      number: 1,

      currentSort: "completed",

      currentSortDir: "asc",
      currentSort: "",

      pageSize: 10,
      currentPage: 1,
    };
  },

  created() {
    setTimeout(() => {
      //Get data From Todo
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((response) => {
          this.list = response;
        });

      //Get data to access to Asignee Names
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) => {
          this.loading = false;
          this.userList = users;
          this.bind();
        });
    }, 850);
  },
  mounted() {},
  methods: {
    getData() {},
    updateStatus() {
      //Update Status
      fetch(`https://jsonplaceholder.typicode.com/todos/${this.list.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          completed: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.sortedList.completed = json.completed;
          console.log(this.sortedList.completed);
        });
    },
    editTitle(index) {
      fetch("https://jsonplaceholder.typicode.com/todos/1", {
        method: "PATCH",
        body: JSON.stringify({
          title: "test1",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => (this.sortedList.title = json.title));
    },

    // You may update task(title) when you onfocus onto related title section
    updateTask($event, item) {
      $event.preventDefault();
      item.title = $event.target.innerText;
      fetch("https://jsonplaceholder.typicode.com/todos/1", {
        method: "PATCH",
        body: JSON.stringify({
          title: "test1",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => (this.sortedList.title = json.title));
      $event.target.blur();
      console.log(json);
    },

    editTodo: function(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    // removeTodo: function(todo) {
    //   this.todos.splice(this.todos.indexOf(todo), 1);
    // },

    // removeTask: function(lists) {
    //   var index = this.sortedList.findIndex(this.sortedList, lists);
    //   this.sortedList.splice(index, 1);
    // },

    removeChart(index) {
      this.list.splice(index, 1);
      return fetch(`${USER_URL}/${this.list.id}`, {
        method: "delete",
      });
    },

    // Insert Asignee names from /users endpoint to /todo endpoint's response
    bind: function() {
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.userList.length; j++) {
          if (this.list[i].userId === this.userList[j].id) {
            this.list[i].name = this.userList[j].name;
          }
        }
      }
    },

    //Sorting all list accordingto Status 1.In Progress 2.Done
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
      document
        .querySelector(".status")
        .addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
    },

    // Pagination feature to continue next page go back to previous page
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.list.length)
        this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },

  computed: {
    //Sorting all list accordingto Status 1.In Progress 2.Done and added navigator

    sortedList: function() {
      return this.list
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
}
th {
  padding-left: 15px;

  text-align: left;
  border-bottom: 2px solid rgba(214, 214, 214, 0.8);
}

.status {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.status:hover {
  color: blue;
}
tr td {
  text-align: left;
  padding-left: 15px;
}
.title {
  border: 1px solid rgba(223, 223, 223, 0.5);
}
td:nth-child(1) {
  width: fit-content;
}
.edit-button {
  border: none;
  border-radius: 5px;
  color: #fff;
  outline: none;
  cursor: pointer;
  background: rgb(65, 65, 241);
}
.delete-button {
  border: none;
  border-radius: 5px;
  color: #fff;
  outline: none;
  cursor: pointer;
  background: rgb(207, 9, 9);
  margin-left: 5px;
}

@media only screen and (max-width: 1002px) {
  .table-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
