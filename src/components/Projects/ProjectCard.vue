<template>
  <v-container>
    <UpdateProjectModal />
    <v-hover v-slot:default="{ hover }">
      <v-card
        outlined
        color="lighten-1"
        :elevation="hover ? 20 : 2"
        :class="{ 'on-hover': hover }"
        max-width="344"
        class="mx-auto"

      >
        <v-card-title
          class="headline text-truncate d-inline-block"
          style="max-width: 300px"
        >
          {{ project.name }}
          <span
            class="material-icons position-forward-action pa-2"
            @click="redirectProjectPage(project._id)"
          >
            forward
          </span>
          <span
            :class="{ 'show-action': hover }"
            class="material-icons position-delete-action pa-2"
            @click="deleteProject(project._id)"
            >delete</span
          >
        </v-card-title>
        <v-card-text
          class="text--primary text-truncate"
          style="max-width: 300px"
        >
          {{ project.description }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="updateProject()" class="green">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import UpdateProjectModal from "./UpdateProjectModal";
import { modalTypes } from "@/api/types";
export default {
  components: {
    UpdateProjectModal,
  },
  props: {
    project: Object,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
      deleteProject: "projects/deleteProject",
    }),
    redirectProjectPage(id) {
      this.$router.push(`project/${id}`);
    },
    updateProject() {
      this.setModalState({
        isActive: true,
        type: modalTypes.UPDATE_PROJECT_MODAL,
        data: this.$props.project,
      });
    },
  },
};
</script>

<style scoped>
.position-forward-action {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 20px;
  cursor: pointer;
}

.position-delete-action {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  opacity: 0;
  cursor: pointer;
}
.show-action {
  opacity: 1 !important;
}
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
