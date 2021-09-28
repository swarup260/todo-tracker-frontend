<template>
  <v-col>
    <v-hover v-slot:default="{ hover }">
      <v-card
        outlined
        :class="{ 'on-hover': hover }"
        :elevation="hover ? 4 : 1"
        class="pointer"
        @click="openModal"
      >
        <v-card-title>
          {{ note.name }}
          <DeleteNoteBtn
            :note="note"
            :columnRef="columnId"
            :noteIndex="noteIndex"
          />
        </v-card-title>
      </v-card>
    </v-hover>
    <UpdateNoteModal />
    <!-- <TestModal /> -->
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import { modalTypes } from "@/api/types";
import UpdateNoteModal from "./UpdateNoteModal";
// import TestModal from "./TestModal";
import DeleteNoteBtn from "./DeleteNoteBtn";
export default {
  components: {
    UpdateNoteModal,
    // TestModal,
    DeleteNoteBtn,
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
      const isDescriptionPresent = Boolean(this.$props.note.description)
      this.setModalState({
        isActive: true,
        type: modalTypes.UPDATE_NOTE_MODAL,
        data: { ...this.$props.note, columnRef: this.$props.columnId , isDescriptionPresent},
      });
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
.pointer {
  cursor: pointer;
}

.note-delete-action {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  cursor: pointer;
}
</style>