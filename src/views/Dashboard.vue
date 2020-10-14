<template>
  <v-container>
    <!-- ADD TODO -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add New ToDo</v-card-title>
        <v-card-text>
          <AddTodo @closeModel="modelClose" />
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
    <!-- END ADD TODO -->
    <v-container>
      <draggable v-model='onGoingTask' group="a" draggable=".item" class="row" >
        <v-col
          sm="3"
          md="3"
          v-for="todo in onGoingTask"
          :key="todo._id"
          class="item"
        >
          <TodoCard :todo="todo" />
        </v-col>
      </draggable>
      <v-spacer class="mb-16"></v-spacer>
      <v-row :class="{ 'hide-div': completeTask.length == 0 }">
        <h4>Complete Task</h4>
        <v-divider></v-divider>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          lg="3"
          v-for="todo in completeTask"
          :key="todo.id"
        >
          <TodoCard :todo="todo" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AddTodo from "@/components/AddTodo";
import TodoCard from "@/components/TodoCard";
import draggable from "vuedraggable";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Dashboard",
  components: {
    AddTodo,
    TodoCard,
    draggable,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      fetchTodo: "todo/fetchTodo",
      updateTodoState: "todo/updateTodoState",
    }),
    ...mapMutations(["SET_MESSAGE"]),
    modelClose(value) {
      this.dialog = value;
    },
  },
  computed: {
    ...mapGetters({
      completeTask: "todo/completeTask",
      inCompleteTask: "todo/inCompleteTask",
    }),
    onGoingTask : {
      get(){
        return this.inCompleteTask;
      },
      set(value){
        console.log(value);
        this.updateTodoState(value);
        // return this.inCompleteTask;
      }
    }
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
.item {
  cursor: pointer;
}
</style>