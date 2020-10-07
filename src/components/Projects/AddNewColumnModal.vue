<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="modalState"
        persistent
        max-width="290"
        :retain-focus="false"
      >
        <v-card>
          <v-card-title class="headline"> Add New Column </v-card-title>
          <v-card-text>
            <v-form ref="AddColumnForm" @submit.prevent="addColumn">
              <v-text-field
                v-model="inputUser.name"
                :rules="inputRules"
                label="Column Name"
                outlined
              ></v-text-field>
              <v-btn color="success" block type="submit">Add</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="setModal(false)">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { rules } from "../../utils/validation-rule";
export default {
  props: {
    project: Object,
  },
  data() {
    return {
      inputRules: rules.inputRules,
      inputUser: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      modalState: "projects/getModalState",
    }),
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
      add: "projects/addColumn",
    }),
    setModal(status) {
      // console.log(status);
      this.setModalState(status);
    },
    async AddColumn() {
        this.setModalState(false);
    //   let result = await this.add({ ...this.inputUser });
    //   if (result) {
    //     this.setModalState(false);
    //   }
    },
  },
};
</script>

<style>
</style>