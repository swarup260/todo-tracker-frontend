<template>
  <v-containter>
    <v-col class="fill-width"><h2 class="pa-5">{{ project.projectName }} </h2></v-col>
    <v-col
      align="center"
      justify="center"
      class="fill-width"
      ref="startProject"
    >
      <h2 class="ma-5">This project doesn’t have any columns or cards.</h2>
      <v-btn color="success right" @click="addNewProject">Add Columns</v-btn>
    </v-col>
  </v-containter>
</template>

<script>
import { getData } from "../utils/localStorage";
export default {
  data() {
    return {
      project: {},
    };
  },
  methods: {
    getProject() {
      this.project = getData("projects").filter(
        (project) => this.$route.params.id == project._id
      )[0] || {};
    },
  },
  created(){
    this.getProject();
  }
};
</script>

<style>
</style>