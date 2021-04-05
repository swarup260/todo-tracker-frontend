<template>
  <v-card outlined>
    <v-card-title>
      <span class="title font-weight-light">Add New Project</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="addNewProject" @submit.prevent="submitHandler" class="pa-2">
        <v-text-field
          v-model="inputUser.name"
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
        <v-btn color="success" block type="submit" :loading="isLoading">Create Project</v-btn>
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
        name: "",
        description: "",
      },
      isLoading : false
    };
  },
  methods: {
    ...mapActions({
      addProject: "projects/addProject",
    }),
    async submitHandler() {
      if (this.$refs.addNewProject.validate()) {
        this.isLoading = true;
        const result = await this.addProject({ ...this.inputUser });
        if (result) {
          this.isLoading = false;
          this.inputUser = {
            name: "",
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