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
          <v-card-title class="headline"> Add New Column </v-card-title>
          <v-card-text>
            <v-form ref="AddColumnForm" @submit.prevent="addColumn">
              <v-text-field
                v-model="inputUser.name"
                :rules="inputRules"
                label="Column Name"
                outlined
              ></v-text-field>
              <v-color-picker
                dot-size="25"
                swatches-max-height="200"
                elevation="5"
                v-model="inputUser.color"
              ></v-color-picker>
              <v-btn color="success" block type="submit">Add</v-btn>
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
    projectId: String,
  },
  data() {
    return {
      inputRules: rules.inputRules,
      inputUser: {
        name: "",
        color : ""
      },
    };
  },
  computed: {
    ...mapGetters({
      modalState: "projects/getModalState",
      project: "projects/getProject",
    }),
    computedState: {
      get() {
        return (
          this.modalState.isActive &&
          this.modalState.type == modalTypes.ADD_COL_MODAL
        );
      },
    },
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
      add: "projects/addColumn",
    }),
    closeModal() {
      this.setModalState({
        isActive: false,
        type: modalTypes.ADD_COL_MODAL,
        data: {},
      });
    },
    async addColumn() {
      let result = await this.add({
        projectId: this.$props.projectId,
        update: {
          ...this.inputUser,
          position: this.project.columns.length,
        },
      });
      if (result) {
        this.closeModal();
        this.inputUser.name = "";
      }
    },
  },
};
</script>

<style>
</style>