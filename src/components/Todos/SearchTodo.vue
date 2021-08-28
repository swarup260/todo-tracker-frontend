<template>
  <v-text-field
    @keyup="searchTodo"
    v-model="searchTerm"
    label="Search Todo"
    outlined
    lazy
  ></v-text-field>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    ...mapGetters({
      todos: "todo/getTodos",
    }),
    searchTodo() {
      if (this.searchTerm == "") {
        return false;
      }
      const regex = new RegExp(this.searchTerm, "i");
      const filterTodos = this.todos().filter((todo) =>
        todo.taskName.match(regex)
      );
      console.log(filterTodos);
      // this.searchTerm = "";
    },
  },
};
</script>

<style>
</style>