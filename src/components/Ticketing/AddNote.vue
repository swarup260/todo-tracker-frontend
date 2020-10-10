<template>
  <v-card outlined class="pa-2">
    <v-form ref="signUpForm" @submit.prevent="submitHandler">
      <v-text-field outlined v-model="noteName"></v-text-field>
      <v-row no-gutters justify="space-between">
        <v-btn small type="submit"  color="success">Add</v-btn>
        <v-btn small @click="setNoteModalState(false)">Cancel</v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    columnId: String,
    projectId: String,
  },
  data() {
    return {
      noteName: "",
    };
  },
  methods: {
    ...mapActions({
      setNoteModalState: "projects/setNoteModalState",
      add: "projects/addNote",
    }),
    async submitHandler() {
      const result = await this.add({
        projectId: this.$props.projectId,
        update: {
          name: this.noteName,
          position: 1,
          columnRef: this.$props.columnId,
        },
      });
      if (result) {
        this.noteName = "";
      }
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>