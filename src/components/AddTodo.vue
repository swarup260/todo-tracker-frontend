<template>
  <v-container>
    <v-form ref="addToDoForm" @submit.prevent="submitTodo">
      <v-row class="mb-6" justify="center" no-gutters>
        <v-text-field
          v-model="inputUser.taskName"
          :rules="inputRules"
          label="Task Name"
          outlined
        ></v-text-field>
      </v-row>
      <Editor />
      <v-row class="mb-6" justify="center" no-gutters>
        <v-col lg="6">
          <v-switch
            v-model="inputUser.status"
            class="ma-2"
            label="Status"
          ></v-switch>
        </v-col>
        <v-col lg="6">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="inputUser.deadline"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="inputUser.deadline"
                label="Set A Deadline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="inputUser.deadline" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(inputUser.deadline)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row class="mb-6" justify="center" no-gutters>
        <v-btn color="success" class="ml-3" block type="submit">Add</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Editor from "./Editor"
import { rules } from "../utils/validation-rule";
import { mapActions } from "vuex";
export default {
  components: {
    Editor
  },
  data() {
    return {
      modal: false,
      inputRules: rules.inputRules,
      inputUser: {
        taskName: "",
        description: "Description",
        status: false,
        deadline: new Date().toISOString().substr(0, 10),
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions({
      addTodo: "todo/addTodo",
    }),
    async submitTodo() {
      // if (this.$refs.addToDoForm.validate()) {
      //   let result = await this.addTodo({ ...this.inputUser });
      //   if (result) {
      //     this.inputUser = {
      //       taskName: "",
      //       description: "",
      //       status: false,
      //       deadline: new Date().toISOString().substr(0, 10),
      //     };
      //     this.$emit("closeModel", false);
      //   }
      // },
    },
  }
};
</script>

