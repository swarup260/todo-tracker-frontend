<template>
  <v-container>
    <v-dialog v-model="modalState" max-width="500px">
      <v-card>
        <v-card-title>Add New ToDo</v-card-title>
        <v-card-text>
          <AddTodoForm />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AddTodoForm from "@/components/Todos/AddTodoForm";
import { mapActions, mapGetters } from "vuex";
import { modalTypes } from "@/api/types.js";
export default {
  components: {
    AddTodoForm,
  },
  computed: {
    modalState: {
      get() {
        const state = this.state();
        return state.state && state.type == modalTypes.ADD_TODO_MODAL;
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