<template>
  <div>
    <!-- UPDATE TODO MODAL -->
    <v-dialog v-model="updateDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Update Todo</v-card-title>
        <v-card-text>
          <UpdateTodo @closeUpdateFormModel="closeForm" :inputUser="updateTodoData" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click.stop="updateDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- END UPDATE TODO MODAL -->
    <v-hover v-slot:default="{ hover }">
      <v-card
        class="mx-auto draggable"
        max-width="344"
        :color="getColor(todo.status)"
        dark
        :elevation="hover ? 20 : 2"
        :class="{ 'on-hover': hover }"
      >
        <v-card-title class="headline text-truncate d-inline-block" style="max-width: 250px;">
          {{todo.taskName}}
          <span
            :class="{ 'show-delete-action': hover }"
            class="material-icons position-delete-action pa-2"
            @click="deleteTodoComponent(todo._id)"
          >delete</span>
        </v-card-title>
        <v-card-subtitle>DeadLine : {{ new Date(todo.deadline).toLocaleDateString() }}</v-card-subtitle>
        <v-card-text>
          <div class="text--primary text-truncate" style="max-width: 300px;">{{ todo.description }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="!todo.status" @click="updateStatusTodo(todo._id)" text>Mark As Complete</v-btn>
          <v-btn
            :class="{ 'show-btns': hover }"
            color="transparent"
            @click="updateDescpTodo(todo)"
            text
          >Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import UpdateTodo from "@/components/UpdateTodo";
import { mapActions } from "vuex";
export default {
  components: {
    UpdateTodo,
  },
  props: {
    todo: Object,
  },
  data() {
    return {
      updateDialog: false,
      updateTodoData: {},
    };
  },
  methods: {
    ...mapActions({
      updateTodo: "todo/updateTodo",
      deleteTodo: "todo/deleteTodo",
    }),
    updateStatusTodo(id) {
      this.updateTodo({
        id: id,
        update: {
          status: true,
        },
      });
    },
    updateDescpTodo(data) {
      this.updateTodoData = data;
      this.updateDialog = true;
    },
    deleteTodoComponent(id) {
      this.deleteTodo(id);
    },
    getColor(status) {
      return status ? "green" : "red";
    },
    closeForm(value) {
      this.updateDialog = value;
    },
  },
};
</script>

<style scoped>
.position-delete-action {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  opacity: 0;
  cursor: pointer;
}
.show-delete-action {
  opacity: 1;
}
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.draggable {
    /* Indicate the element draggable */
    cursor: move;
    /* Doesn't allow to select the content inside */
    user-select: none;
}
</style>