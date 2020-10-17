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
import { modalTypes } from "@/api/types.js";
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
          this.loadingState().type == modalTypes.FETCH_TODOS_LOADING
        );
      },
    },
  },
  methods: {
    ...mapGetters({
      loadingState: "todo/getLoadingState",
    }),
    ...mapActions({
      fetch: "todo/fetchTodo",
      setLoadingState: "todo/setLoadingState",
    }),
  },
  async created() {
    this.setLoadingState({ state: true, type: modalTypes.FETCH_TODOS_LOADING });
    const result = await this.fetch();
    if (result) {
      this.setLoadingState({ state: false, type: "" });
    }
  },
};
</script>
<style scoped>
</style>