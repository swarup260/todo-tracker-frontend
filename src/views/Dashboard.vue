<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add New ToDo</v-card-title>
        <v-card-text>
          <AddTodo />
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
      <v-row >
        <v-col cols="12" sm="4" v-for="todo in todos" :key="todo.id">
        <v-card class="mx-auto" max-width="344" color="#385F73" dark>
          <v-card-title class="headline">{{todo.taskName}}</v-card-title>
          <v-card-subtitle>{{ todo.deadline }}</v-card-subtitle>
          <v-card-text>
            <div class="text--primary">
              {{ todo.Description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text>Mark As Complete</v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
      <v-spacer class="mb-16"></v-spacer>
      <v-row>
        <h4>Complete Task</h4>
      </v-row>
      <v-divider></v-divider>
      <v-row >
        <v-col cols="12" sm="4" v-for="todo in todos" :key="todo.id">
        <v-card class="mx-auto" max-width="344" color="#385F73" dark>
          <v-card-title class="headline">{{todo.taskName}}</v-card-title>
          <v-card-subtitle>{{ todo.Description }}</v-card-subtitle>
          <v-card-actions>
            <!-- <v-btn text>Set As Complete</v-btn> -->
          </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AddTodo from "@/components/AddTodo";
export default {
  name: "Dashboard",
  components: {
    AddTodo,
  },
  data() {
    return {
      dialog: false,
      todos: [
        {
          id: 1,
          taskName: "Programming",
          Description: "learning C#",
          status: false,
          deadline: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          taskName: "Programming python",
          Description: "learning C#",
          status: true,
          deadline: new Date().toLocaleDateString(),
        },
        {
          id: 3,
          taskName: "Programming Dart",
          Description: "learning C#",
          status: false,
          deadline: new Date().toLocaleDateString(),
        },
        {
          id: 4,
          taskName: "Programming Javascript",
          Description: "learning C#",
          status: false,
          deadline: new Date().toLocaleDateString(),
        },
        {
          id: 5,
          taskName: "Programming",
          Description: "learning C#",
          status: false,
          deadline: new Date().toLocaleDateString(),
        },
      ],
    };
  },
};
</script>