<template>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <div id="table">
    <!-- <table>
      <tr>
        <th>#</th>
        <th>Assignee</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tr v-for="item in response" :key="item.userId">
        <td></td>
        <td>asdsafsad</td>
        <td>asfsad</td>
        <td>asdsafas</td>
      </tr>
    </table> -->

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
        <td>{{ i + 1 }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.name }}</td>
        <td v-if="item.completed">Done</td>
        <td v-else>In Progress</td>
        <td>
          <button class="edit-button">Edit</button>
          <button class="delete-button" @click="remove()">Delete</button>
        </td>
      </tr>
    </table>
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
    };
  },

  created() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((response) => {
        this.list = response;
      });

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => (this.userList = users).then(this.bind()));
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
      console.log("asd");
      document.addEventListener("mousedown", function(e) {
        e.preventDefault();
      });
    },
    
  },
  computed: {
    sortedList: function() {
      return this.list.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
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
</style>
