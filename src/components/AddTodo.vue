<template>
  <v-container>
    <v-row class="mb-6" justify="center" no-gutters>
        <v-text-field label="Task Name" outlined></v-text-field>
    </v-row>
    <v-row class="mb-6" justify="center" no-gutters>
        <v-textarea label="Description" outlined></v-textarea>
    </v-row>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col lg="6">
        <v-switch class="ma-2" label="Status"></v-switch>
      </v-col>
      <v-col lg="6">
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date" label="Set A Deadline" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="mb-6" justify="center" no-gutters>
        <v-btn
          block
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="loader = 'loading'"
        >
          Add Todo
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>Adding...</v-icon>
            </span>
          </template>
        </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      loading: false,
      loader: null,
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
  },
};
</script>

<style>
</style>