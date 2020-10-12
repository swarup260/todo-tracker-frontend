<template>
  <v-col>
    <v-hover v-slot:default="{ hover }">
      <v-card
        outlined
        :class="{ 'on-hover': hover }"
        :elevation="hover ? 4 : 1"
      >
        <v-card-title>
          {{ note.name }}
          <span
            class="position-add-action material-icons pa-2"
            v-if="hover"
            @click="deleteNote(note._id)"
            >delete</span
          >
        </v-card-title>
        <v-btn
          v-if="hover"
          small
          @click="openModal"
          color="success"
          class="ma-3"
        >
          edit
        </v-btn>
      </v-card>
    </v-hover>
    <UpdateNoteModal />
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
    noteIndex: Number,
    columnId: String,
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
    deleteNote(id) {
      console.log(id, this.$props.noteIndex, this.$props.columnId);
    },
  },
};
</script>

<style>
.hide {
  opacity: 0;
}
.show {
  opacity: 1;
}
</style>