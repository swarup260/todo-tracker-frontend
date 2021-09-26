<template>
  <v-container>
    <div v-if="note.isDescriptionPresent">
      <span class="subtitle-1">
        {{ note.description }}
      </span>
      <v-icon small @click="editDescription"> edit </v-icon>
    </div>
    <v-form
      v-if="!note.isDescriptionPresent"
      ref="editDescription"
      @submit.prevent="updateDescription"
    >
      <v-text-field
        v-model="descriptionText"
        :rules="inputRules"
        label="Description"
        placeholder="Add a more detailed description"
        outlined
        ref="description"
      ></v-text-field>
      <v-btn color="green" type="submit" :loading="isLoading"> Save </v-btn>
      <v-btn @click="cancelEditDescription" text> Cancel </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "../../utils/validation-rule";
export default {
  props: {
    note: Object,
  },
  data() {
    return {
      inputRules: rules.inputRules,
      isLoading: false,
      descriptionText: "",
    };
  },
  methods: {
    ...mapActions({
      udpate: "projects/udpateNote",
    }),
    editDescription() {
      const { description } = this.$props.note;
      this.$props.note.isDescriptionPresent = !this.$props.note.isDescriptionPresent;
      this.descriptionText = description;
    },
    cancelEditDescription() {
      const flag = Boolean(this.$props.note.description);
      console.log("isDescriptionPresent",flag);
      if (!flag) {
        this.descriptionText = "";
      }

      if (flag) {
        this.$props.note.isDescriptionPresent = !this.$props.note.isDescriptionPresent;
      }
    },
    async updateDescription() {
      if (!this.$refs.editDescription.validate()) {
        return false;
      }
      this.isLoading = true;
      const { _id } = this.$props.note;
      const result = await this.udpate({
        noteId: _id,
        projectId: this.$props.note.projectRef,
        update: {
          description: this.descriptionText,
        },
      });
      if (result) {
        this.isLoading = false;
        this.$props.note.isDescriptionPresent =
          !this.$props.note.isDescriptionPresent;
      }
    },
  },
};
</script>

<style>
</style>