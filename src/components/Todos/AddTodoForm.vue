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
      <v-row class="mb-6" justify="center" no-gutters>
        <v-textarea
          v-model="inputUser.description"
          label="Description"
          outlined
        ></v-textarea>
      </v-row>
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
        <v-btn
          color="success"
          class="ml-3"
          block
          type="submit"
          :loading="isLoading"
          >Add</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { rules } from "@/utils/validation-rule";
import { loadingStateTypes } from "@/api/types.js";
import { mapActions, mapGetters } from "vuex";
const defaultInputUser = {
  taskName: "",
  status: false,
  description: "",
  deadline: new Date().toISOString().substr(0, 10),
};
export default {
  components: {},
  data() {
    return {
      modal: false,
      inputRules: rules.inputRules,
      inputUser: defaultInputUser,
    };
  },
  computed: {
    isLoading: {
      get() {
        return (
          this.loadingState().state &&
          this.loadingState().type == loadingStateTypes.ADD_TODO
        );
      },
    },
  },
  methods: {
    ...mapGetters({
      loadingState: "todo/getLoadingState",
    }),
    ...mapActions({
      add: "todo/addTodo",
      setState: "todo/setModalState",
    }),
    async submitTodo() {
      if (this.$refs.addToDoForm.validate()) {
        console.log({ ...this.inputUser });
        let result = await this.add({
          ...this.inputUser,
        });
        if (result) {
          this.inputUser = defaultInputUser;
          this.setState({ state: false, type: "", data: {} });
        }
      }
    },
  },
};
</script>
<style scoped>
</style>
