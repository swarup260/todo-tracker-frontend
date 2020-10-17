<template>
  <v-dialog v-model="modalState" max-width="500px">
    <v-card>
      <v-card-title>Update Task : {{ todo.taskName }} </v-card-title>
      <v-card-text>
        <UpdateTodoForm :todo="todo" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UpdateTodoForm from "@/components/Todos/UpdateTodoForm";
import { mapActions, mapGetters } from "vuex";
import { modalTypes } from "@/api/types.js";
export default {
  components: {
    UpdateTodoForm,
  },
  computed: {
    modalState: {
      get() {
        const state = this.state();
        return state.state && state.type == modalTypes.UPDATE_TODO_MODAL;
      },
    },
    todo: {
      get() {
        return this.state().data;
      },
    },
  },
  methods: {
    ...mapGetters({
      state: "todo/getModalState",
    }),
    ...mapActions({
      setState: "todo/setModalState",
    }),
    closeModal() {
      this.setState({ state: false, type: "", data: {} });
    },
  },
};
</script>

<style>
</style>