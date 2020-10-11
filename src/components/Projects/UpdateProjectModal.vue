<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="computedState"
        persistent
        max-width="290"
        :retain-focus="false"
      >
        <v-card>
          <v-card-title class="headline"> Update Project Details </v-card-title>
          <v-card-text>
            <v-form ref="updateProjectForm" @submit.prevent="updateProject">
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
              <v-btn color="success" block type="submit">Update</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="closeModal">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { rules } from "../../utils/validation-rule";
import { modalTypes } from "@/api/types";
export default {
  props: {
    project: Object,
  },
  data() {
    return {
      inputRules: rules.inputRules,
    };
  },
  computed: {
    ...mapGetters({
      modalState: "projects/getModalState",
    }),
    computedState: {
      get() {
        return (
          this.modalState.isActive &&
          this.modalState.type == modalTypes.UPDATE_PROJECT_MODAL
        );
      },
    },
    inputUser: {
      get() {
        return {
          name: this.$props.project.name,
          description: this.$props.project.description,
        };
      },
    },
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
      update: "projects/updateProject",
    }),
    closeModal() {
      this.setModalState({
        isActive: false,
        type: modalTypes.UPDATE_PROJECT_MODAL,
      });
    },
    async updateProject() {
      let result = await this.update({
        projectId: this.$props.project._id,
        update: { ...this.inputUser },
      });
      if (result) {
        this.setModalState(false);
      }
    },
  },
};
</script>

<style>
</style>