<template>
  <v-container>
    <div v-if="!editTitle">
      {{ note.name }}
      <v-icon small @click="editTitle = !editTitle"> edit </v-icon>
    </div>
    <v-text-field
      v-if="editTitle"
      v-model="note.name"
      :rules="inputRules"
      label="Title"
      outlined
      :loading="isLoading"
      @keyup.enter="updateTitle(note.name)"
    ></v-text-field>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "../../utils/validation-rule";
export default {
  props: {
    note: Object
  },
  data() {
    return {
      inputRules: rules.inputRules,
      editTitle: false,
      isLoading : false
    };
  },
  methods : {
    ...mapActions({
      udpate: "projects/udpateNote",
    }),
    updateTitle(title){
      this.isLoading = true
      const result = this.udpate({
        noteId: this.$props.note._id,
        projectId:this.$props.note.projectRef,
        columnRef:this.$props.note.columnRef,
        update : {
          name : title
        }
      });
      if (result) {
        this.isLoading = false
        this.editTitle = false
      }
    }

  }
};
</script>

<style>
</style>