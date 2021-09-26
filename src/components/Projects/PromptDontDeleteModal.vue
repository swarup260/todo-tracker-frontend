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
          <v-card-title class="headline red--text" > Don't Column </v-card-title>
          <v-card-text class="subtitle-1 font-weight-black">
            Column Notes Not Empty Move or Delete Existing Notes !!
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
import { modalTypes } from "@/api/types";
export default {
  computed: {
    ...mapGetters({
      modalState: "projects/getModalState",
    }),
    computedState: {
      get() {
        return (
          this.modalState.isActive &&
          this.modalState.type == modalTypes.PROMPT_DONT_DELETE_COL
        );
      },
    },
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
    }),
    closeModal() {
      this.setModalState({
        isActive: false,
        type: modalTypes.PROMPT_DONT_DELETE_COL,
        data: {},
      });
    },
  },
};
</script>