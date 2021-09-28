<template>
  <v-container>
    <SearchTodo />
    <TodoList />
    <SkeletonTodoLoder v-if="isLoading" />
    <AddBtnTodo />
  </v-container>
</template>

<script>
import SkeletonTodoLoder from "@/components/Todos/SkeletonTodoLoder";
import SearchTodo from "@/components/Todos/SearchTodo";
import AddBtnTodo from "@/components/Todos/AddBtnTodo";
import TodoList from "@/components/Todos/TodoList";
import { loadingStateTypes } from "@/api/types.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    SearchTodo,
    SkeletonTodoLoder,
    AddBtnTodo,
    TodoList
  },
  computed: {
    isLoading: {
      get() {
        return (
          this.loadingState().state &&
          this.loadingState().type == loadingStateTypes.FETCH_TODO
        );
      },
    },
  },
  methods: {
    ...mapGetters({
      loadingState: "todo/getLoadingState",
    }),
    ...mapActions({
      fetchTodo: "todo/fetchTodo",
      setLoadingState: "todo/setLoadingState",
    }),
  },
  async created() {
    await this.fetchTodo();
  },
};
</script>
<style scoped>
</style>