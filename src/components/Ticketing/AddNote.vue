<template>
  <v-container>
    <v-form ref="signUpForm" @submit.prevent="submitHandler(id)">
      <v-text-field outlined v-model="noteName"></v-text-field>
      <v-btn-toggle>
        <v-btn type="submit" large color="success">Add</v-btn>
        <v-btn large @click="cancel">Cancel</v-btn>
      </v-btn-toggle>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      noteName: "",
    };
  },
  methods: {
    submitHandler(id) {
      this.$emit("ticketName", { id: id, name: this.noteName });
    },
    cancel() {
      this.$emit("hidden", "true");
    },
  },
};
</script>

<style>
</style>