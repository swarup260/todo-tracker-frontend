<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="position-add-action material-icons pa-2"
        :loading="isLoading"
        icon
        v-on="on"
        v-bind="attrs"
        >delete</v-btn
      >
    </template>

    <v-card>
      <v-card-title class="text-h5">
        Delete Note?
      </v-card-title>
      <v-card-text
        class="subtitle-1">Are You Sure You Want to Delete Note, 
        It Will Delete All Comments !!</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteNote(note)">
          Yes
        </v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    note: Object,
    columnRef: String,
    noteIndex : Number
  },
  data() {
    return {
      isLoading: false,
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      delete: "projects/deleteNote",
    }),
      deleteNote(note){
        this.isLoading = true
        this.dialog = false
        const result = this.delete({
          noteId : note._id,
          projectRef: note.projectRef,
          columnRef : this.$props.columnRef,
          noteIndex : this.$props.noteIndex
        });
        if (result) {
          this.isLoading = false
        }
      }
  },
};
</script>

<style>
</style>