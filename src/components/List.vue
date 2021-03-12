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
      <tr v-for="(item, i) in sortedList" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.name }}</td>
        <td v-if="item.completed">Done</td>
        <td v-else>In Progress</td>
        <td class="table-buttons">
          <button class="edit-button">Edit</button>
          <button class="delete-button" @click="remove()">Delete</button>
        </td>
      </tr>
    </table>

    <button @click="prevPage">Prev</button>
    <button @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  el: "#table",
  data: {
    list: [],
    currentSortDir: "asc",
  },
  data() {
    return {
      list: [],
      userList: [],
      currentSortDir: "asc",
      currentSort: "completed",

      pageSize: 10,
      currentPage: 1,
    };
  },

  created() {
    window.addEventListener("load", (event) => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((response) => {
          this.list = response;
        });

      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) => (this.userList = users).then(this.bind()));
    });
  },

  methods: {
    remove: function() {
      console.log("...");
    },
    bind: function() {
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.userList.length; j++) {
          if (this.list[i].userId === this.userList[j].id) {
            this.list[i].name = this.userList[j].name;
          }
        }
      }
    },

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

    nextPage: function() {
      if (this.currentPage * this.pageSize < this.list.length)
        this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  computed: {
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
