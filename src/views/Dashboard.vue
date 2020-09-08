<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add New ToDo</v-card-title>
        <v-card-text>
            <AddTodo />
        </v-card-text>
         <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
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
      dialog: true,
    };
  },
};
</script>