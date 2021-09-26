<template>
  <v-dialog
    v-model="computedState"
    persistent
    max-width="1000"
    :retain-focus="false"
  >
    <v-card>
      <v-card-title class="headline">
        <NoteTitle :note="modalState.data" />
      </v-card-title>
      <v-card-text class="mt-2">
        <NoteDescription :note="modalState.data" />
        <br />
        <CommenSection :note="modalState.data" />
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
import { rules } from "../../utils/validation-rule";
import CommenSection from "./CommentSection";
import NoteTitle from "./NoteTitle";
import NoteDescription from "./NoteDescription";
export default {
  components: {
    NoteTitle,
    NoteDescription,
    CommenSection,
  },
  data() {
    return {
      inputRules: rules.inputRules,
      showEditTitle: false
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
          this.modalState.type == modalTypes.UPDATE_NOTE_MODAL
        );
      },
    },
    editExistingDesc: {
      get() {
        return (
          this.modalState.data.description &&
          this.modalState.data.description.length > 0
        );
      },
      set(newValue) {
        console.log("editExistingDesc", newValue);
        return newValue;
      },
    },
    addNewDesc: {
      get() {
        return !this.modalState.data.description;
      },
      set(newValue) {
        return newValue;
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
    editDescription() {
      this.editExistingDesc = !this.editExistingDesc;
      console.log("editDescription", this.editExistingDesc);
      console.log("description", this.modalState.data.description);
    },
    updateComment() {
      this.commentList.push({
        commentText: this.comment,
        addedOn: new Date(),
      });
      this.comment = "";
    }
  },
};
</script>

<style>
.chat-box {
  border: 1px #1976d2 solid;
  padding: 10px;
}
</style>