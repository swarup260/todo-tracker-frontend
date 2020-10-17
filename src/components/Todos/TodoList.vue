<template>
  <div>
    <UpdateTodoModal />
    <v-row v-if="inCompleteTodos.length > 0">
      <v-col
        sm="12"
        md="4"
        lg="3"
        v-for="todo in inCompleteTodos"
        :key="todo._id"
      >
        <TodoCard :todo="todo" />
      </v-col>
    </v-row>
    <v-row v-if="completeTodos.length > 0">
       <v-col cols="12">
           <h3>Complete Task </h3>
           <v-divider></v-divider>
       </v-col>
      <v-col
        sm="12"
        md="4"
        lg="3"
        v-for="todo in completeTodos"
        :key="todo._id"
      >
        <TodoCard :todo="todo" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TodoCard from "@/components/Todos/TodoCard";
import UpdateTodoModal from "@/components/Todos/UpdateTodoModal";
import { mapGetters } from "vuex";
export default {
  components: {
    TodoCard,
    UpdateTodoModal,
  },
  methods: {
    ...mapGetters({
      todos: "todo/getTodos",
    }),
  },
  computed: {
    completeTodos: {
      get() {
        return this.todos().filter((item) => item.status);
      },
    },
    inCompleteTodos: {
      get() {
        return this.todos().filter((item) => !item.status);
      },
    },
  },
};
</script>

<style>
</style>