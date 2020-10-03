<template>
  <v-card outlined>
    <v-card-title>
      <span class="title font-weight-light">Add New Project</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="addNewProject" @submit.prevent="submitHandler" class="pa-2">
        <v-text-field
          v-model="inputUser.projectName"
          :rules="inputRules"
          label="Project Name"
          outlined
        ></v-text-field>
        <v-textarea
          v-model="inputUser.description"
          label="Description"
          outlined
          height="5"
        ></v-textarea>
        <v-btn color="success" block type="submit">Create Project</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "../../utils/validation-rule";
export default {
  data() {
    return {
      inputRules: rules.inputRules,
      inputUser: {
        projectName: "",
        description: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addProject: "projects/addProject",
    }),
    async submitHandler() {
      if (this.$refs.addNewProject.validate()) {
        const result = await this.addProject({ ...this.inputUser });
        if (result) {
          this.inputUser = {
            projectName: "",
            description: "",
          };
        }
      }
    },
  },
};
</script>

<style>
</style>