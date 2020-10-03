<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="6">
        <AddProject />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="project in getProjects" :key="project._id">
        <ProjectCard :project="project" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectCard from "@/components/Projects/ProjectCard";
import AddProject from "@/components/Projects/AddProject";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ProjectCard,
    AddProject,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchProjects: "projects/fetchProjects",
    }),
  },
  computed: {
    ...mapGetters({
      getProjects: "projects/getProjects",
    }),
  },
  async created() {
    this.fetchProjects();
  },
};
</script>

<style>
</style>