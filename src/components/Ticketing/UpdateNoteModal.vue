<template>
  <v-dialog
    v-model="computedState"
    persistent
    max-width="290"
    :retain-focus="false"
  >
    <v-card>
      <v-card-title class="headline">{{ modalState.data.name }} </v-card-title>
      <v-card-text>
        {{ modalState.data }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeModal"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
          this.modalState.type == modalTypes.UPDATE_NOTE_MODAL
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
        type: modalTypes.UPDATE_NOTE_MODAL,
        data: {},
      });
    },
  },
};
</script>

<style>
</style>