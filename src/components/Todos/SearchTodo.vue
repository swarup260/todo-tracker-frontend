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
import { mapGetters,mapMutations } from "vuex";
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
    ...mapMutations({
      setFilteredTodos: "todo/SET_FILTER_TODOS"
    }),
    searchTodo() {
      if (this.searchTerm == "") {
        this.setFilteredTodos([]);
        return false;
      }
      const regex = new RegExp(this.searchTerm, "i");
      const filterTodos = this.todos().filter((todo) =>
        todo.taskName.match(regex)
      );
      this.setFilteredTodos(filterTodos);
    },
  },
};
</script>

<style>
</style>