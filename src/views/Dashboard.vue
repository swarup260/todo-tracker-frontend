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
import { mapActions,mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    AddTodo,
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions({
      fetchTodo : 'todo/fetchTodo'
    })
  },
  watch : {
    todos(newValue){
      this.todos = [...newValue];
    }
  },
  computed : {
    ...mapGetters({
      getTodos : 'todo/getTodos'
    }),
    todos : {
      set(){
        this.todos = this.getTodos();
      }
    }
  },
  async created(){
    try {
      await this.fetchTodo();
    } catch (error) {
        console.log(error);
    }
  }
};
</script>