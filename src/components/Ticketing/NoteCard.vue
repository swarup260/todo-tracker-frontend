<template>
  <v-col>
    <v-hover v-slot:default="{ hover }">
      <v-card
        outlined
        :class="{ 'on-hover': hover }"
        :elevation="hover ? 4 : 1"
        @click="openModal"
      >
        <v-card-title>{{ note.name }}</v-card-title>
      </v-card>
    </v-hover>
    <UpdateNoteModal :note="noteData" />
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import { modalTypes } from "@/api/types";
import UpdateNoteModal from "./UpdateNoteModal";
export default {
  components: {
    UpdateNoteModal,
  },
  props: {
    note: Object,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
    }),
    openModal() {
      this.noteData = this.$props.note;
      this.setModalState({
        isActive: true,
        type: modalTypes.UPDATE_NOTE_MODAL,
        data: this.$props.note,
      });
    },
  },
};
</script>

<style>
</style>