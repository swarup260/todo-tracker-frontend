<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col sm="12" md="6">
        <AddProject />
      </v-col>
    </v-row>
    <span v-if="projects.length > 0" class="mt-10">
      <h3 class="pa-3">Projects</h3>
      <v-divider></v-divider>
    </span>
    <v-row>
      <v-col
        class="flex-basis-fix"
        sm="3"
        v-for="project in projects"
        :key="project._id"
      >
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
      projects: "projects/getProjects",
    }),
  },
  async created() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
.flex-basis-fix {
  flex-basis: auto;
}
</style>