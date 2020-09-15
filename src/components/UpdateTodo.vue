<template>
  <v-container>
    <v-form ref="updateToDoForm" @submit.prevent="updateTodoInfo">
      <v-text-field v-model="inputUser.taskName" :rules="inputRules" label="Task Name" outlined></v-text-field>
      <v-textarea v-model="inputUser.description" label="Description" outlined></v-textarea>
      <v-row class="mb-6" justify="center" no-gutters>
        <v-col lg="6">
          <v-switch v-model="inputUser.status" class="ma-2" label="Status"></v-switch>
        </v-col>
        <v-col lg="6">
          <v-dialog ref="updatedialog" v-model="updatemodal" :return-value.sync="deadline" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="deadline"
                label="Set A Deadline"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="deadline" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="updatemodal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.updatedialog.save(deadline)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row class="mb-6" justify="center" no-gutters>
        <v-btn color="success" class="ml-3" block type="submit">Update</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { rules } from "../utils/validation-rule";
import { mapActions } from "vuex";
export default {
  props: {
    inputUser: Object,
    value: Boolean,
  },
  data() {
    return {
      updatemodal: false,
      inputRules: rules.inputRules,
    };
  },
  computed: {
    deadline : {
      get(){
        console.log(this.$props.inputUser.deadline);
        return new Date(this.$props.inputUser.deadline).toISOString().substr(0, 10);
      },
      set(newValue){
        this.$props.inputUser.deadline = newValue;
        console.log(this.$props.inputUser.deadline);
      }
    },
  },
  methods: {
    ...mapActions({
      updateTodo: "todo/updateTodo",
    }),
    updateTodoInfo() {
      if (this.$refs.updateToDoForm.validate()) {
        const userInput = this.$props.inputUser;
        this.updateTodo({
          id: userInput._id,
          update: {
            status: userInput.status,
            taskName: userInput.taskName,
            deadline: userInput.deadline,
            description: userInput.description,
          },
        });
        this.$emit("input", false);
      }
    },
  },
};
</script>

<style>
</style>