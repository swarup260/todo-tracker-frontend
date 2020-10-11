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
          <v-card-title class="headline"> Edit Column </v-card-title>
          <v-card-text>
            <v-form ref="AddColumnForm" @submit.prevent="UpdateColumn">
              <v-text-field
                v-model="modalState.data.name"
                :rules="inputRules"
                label="Column Name"
                outlined
              ></v-text-field>
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
    projectId: String,
    column: Object,
  },
  data() {
    return {
      inputRules: rules.inputRules,
      inputUser: {
        name: this.$props.column.name,
      },
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
          this.modalState.type == modalTypes.UPDATE_COL_MODAL
        );
      },
    },
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
      update: "projects/updateColumn",
    }),
    closeModal() {
      this.setModalState({
        isActive: false,
        type: modalTypes.UPDATE_COL_MODAL,
        data: {},
      });
    },
    async addColumn() {
      let result = await this.add({
        projectId: this.$props.projectId,
        update: {
          ...this.inputUser,
          position: this.project.columns.length + 1,
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