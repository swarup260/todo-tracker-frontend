<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="modalState" persistent max-width="290" :retain-focus="false"> 
        <v-card>
          <v-card-title class="headline">
            Update Project Details
          </v-card-title>
          <v-card-text>
            <v-form ref="updateProjectForm" @submit.prevent="updateProject">

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="setModal(false)">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- {{ project }} -->
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    project: Object,
  },
  computed: {
    ...mapGetters({
      modalState: "projects/getModalState",
    }),
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
    }),
    setModal(status) {
      // console.log(status);
      this.setModalState(status);
    },
  },
};
</script>

<style>
</style>