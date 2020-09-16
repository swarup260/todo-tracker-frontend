<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add New ToDo</v-card-title>
        <v-card-text>
          <AddTodo v-model="dialog" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      fixed
      right
      bottom
      elevation="5"
      @click="dialog = true"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-container>
      <!-- UPDATE TODO MODAL -->
      <v-dialog v-model="updateDialog" max-width="500px">
        <v-card>
          <v-card-title>Update Todo</v-card-title>
          <v-card-text>
            <UpdateTodo v-model="updateDialog" :inputUser.sync="todo" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="updateDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- END UPDATE TODO MODAL -->
      <v-row>
        <v-col cols="12" sm="4" lg="3" v-for="todo in completeTask" :key="todo._id">
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="mx-auto"
              max-width="344"
              color="#385F73"
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
                <div class="text--primary">{{ todo.description }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="updateStatusTodo(todo._id)" text>Mark As Complete</v-btn>
                <v-btn
                  :class="{ 'show-btns': hover }"
                  color="transparent"
                  @click="updateDescpTodo(todo)"
                  text
                >Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-spacer class="mb-16"></v-spacer>
      <v-row :class="{ 'hide-div': inCompleteTask.length == 0  }">
        <h4>Complete Task</h4>
        <v-divider></v-divider>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" lg="3" v-for="todo in inCompleteTask" :key="todo.id">
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="mx-auto"
              max-width="344"
              color="green"
              :elevation="hover ? 20 : 2"
              :class="{ 'on-hover': hover }"
              dark
            >
              <v-card-title class="headline">
                {{todo.taskName}}
                <span
                  :class="{ 'show-delete-action': hover }"
                  class="material-icons position-delete-action pa-2"
                  @click="deleteTodoComponent(todo._id)"
                >delete</span>
              </v-card-title>
              <v-card-subtitle>{{ todo.description }}</v-card-subtitle>
              <v-card-actions>
                <v-btn
                  :class="{ 'show-btns': hover }"
                  color="transparent"
                  @click="updateDescpTodo(todo)"
                  text
                >Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AddTodo from "@/components/AddTodo";
import UpdateTodo from "@/components/UpdateTodo";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Dashboard",
  components: {
    AddTodo,
    UpdateTodo,
  },
  data() {
    return {
      dialog: false,
      updateDialog: false,
      todo: {},
    };
  },
  methods: {
    ...mapActions({
      fetchTodo: "todo/fetchTodo",
      updateTodo: "todo/updateTodo",
      deleteTodo: "todo/deleteTodo",
    }),
    ...mapMutations(["SET_MESSAGE"]),
    updateStatusTodo(id) {
      this.updateTodo({
        id: id,
        update: {
          status: true,
        },
      });
    },
    updateDescpTodo(data) {
      this.updateDialog = true;
      this.todo = data;
      console.log(data);
    },
    deleteTodoComponent(id) {
      console.log(id);
      this.deleteTodo(id);
    },
  },
  computed: {
    ...mapGetters({
      completeTask: "todo/completeTask",
      inCompleteTask: "todo/inCompleteTask",
    })
  },
  async created() {
    try {
      await this.fetchTodo();
    } catch (error) {
      this.SET_MESSAGE({
        message: error.toString(),
        type: "error",
      });
    }
  },
};
</script>
<style scoped>
/* .v-card {
  transition: opacity .4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.6;
 } */
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.hide-div {
  display: none;
}
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
</style>