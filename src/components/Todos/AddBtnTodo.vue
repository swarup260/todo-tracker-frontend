<template>
  <div>
    <AddTodoModal />
    <v-btn
      class="mx-2"
      fab
      dark
      fixed
      right
      bottom
      elevation="5"
      @click="openModal"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import AddTodoModal from "@/components/Todos/AddTodoModal";
import { mapActions } from "vuex";
import { modalTypes } from "@/api/types.js";
export default {
  components: {
    AddTodoModal,
  },
  methods: {
    ...mapActions({
      setState: "todo/setModalState",
    }),
    openModal() {
      this.setState({ state: true, type: modalTypes.ADD_TODO_MODAL, data: {} });
    },
  },
};
</script>

<style>
</style>