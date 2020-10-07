<template>
  <v-containter>
    <v-col class="fill-width">
      <v-card outlined>
        <v-card-title class="title text-capitalize">
          {{ project.projectName }}
        </v-card-title>
      </v-card>
    </v-col>
    <v-col
      align="center"
      justify="center"
      class="fill-width"
      ref="startProject"
      v-if="project.columns.length == 0"
    >
      <h2 class="ma-5">This project doesn’t have any columns or cards.</h2>
      <v-btn color="success right" @click="addNewProject">Add Columns</v-btn>
    </v-col>
    <ProjectCol :project="project" />
  </v-containter>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProjectCol from "@/components/Projects/ProjectCol";
export default {
  components: {
    ProjectCol,
  },
  data() {
    return {};
  },
  methods: {
    ...mapGetters({
      getProject: "projects/getProject",
    }),
    ...mapActions({
      fetchProjectCols: "projects/fetchProjectCols",
    }),
    addNewProject() {},
  },
  computed: {
    project: {
      get() {
        return this.getProject();
      },
      set() {
        return this.getProject();
      },
    },
  },
  async created() {
    this.fetchProjectCols(this.$route.params.id);
  },
};
</script>

<style>
</style>