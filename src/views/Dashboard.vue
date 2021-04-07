<template>
  <v-container>
    <SkeletonTodoLoder v-if="isLoading" />
    <AddBtnTodo />
    <TodoList />
  </v-container>
</template>

<script>
import SkeletonTodoLoder from "@/components/Todos/SkeletonTodoLoder";
import AddBtnTodo from "@/components/Todos/AddBtnTodo";
import TodoList from "@/components/Todos/TodoList";
import { loadingStateTypes } from "@/api/types.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
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