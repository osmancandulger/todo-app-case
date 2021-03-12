<template>
  <div id="app">
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
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>

        <td>{{ item.name }}</td>
        <td v-if="item.completed">Done</td>
        <td v-else>In Progress</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      userList: [],
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
    bind: function() {
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.userList.length; j++) {
          if (this.list[i].userId === this.userList[j].id) {
            this.list[i].name = this.userList[j].name;
          }
        }
      }
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
tr td {
  text-align: left;
  padding-left: 15px;
}
td:nth-child(1) {
  width: fit-content;
}
</style>
