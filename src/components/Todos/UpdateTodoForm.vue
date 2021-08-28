<template>
  <v-form ref="udpateForm" @submit.prevent="updateTodo">
    <v-text-field
      :value="formData.taskName"
      :rules="inputRules"
      label="Task Name"
      outlined
      lazy
    ></v-text-field>
    <v-textarea
      :value="formData.description"
      label="Description"
      outlined
      lazy
    ></v-textarea>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col lg="6">
        <v-switch
          v-model="formData.status"
          class="ma-2"
          label="Status"
          lazy
        ></v-switch>
      </v-col>
      <v-col lg="6">
        <!-- Conditional Rendering -->
        <v-dialog
          v-if="!formData.status"
          ref="updatedialog"
          v-model="datePickerModal"
          :return-value.sync="deadline"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="deadline"
              label="Set A Deadline"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="deadline" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="datePickerModal = false"
              >Cancel</v-btn
            >
            <v-btn
              text
              color="primary"
              @click="$refs.updatedialog.save(deadline)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
        <v-text-field
              v-model="deadline"
              label="Set A Deadline"
              prepend-icon="event"
              readonly
              disabled
              v-if="formData.status"
        ></v-text-field>
        <!-- Conditional Rendering -->
      </v-col>
    </v-row>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-btn
        color="success"
        class="ml-3"
        block
        type="submit"
        :loading="isLoading"
        >Update</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
import { rules } from "@/utils/validation-rule";
import { mapActions,mapGetters } from "vuex";
import { loadingStateTypes } from "@/api/types.js";
export default {
  props: {
    todo: Object,
  },
  data() {
    return {
      datePickerModal: false,
      inputRules: rules.inputRules
    };
  },
  computed: {
    formData: {
      get() {
        return this.$props.todo;
      },
    },
    deadline: {
      get() {
        return new Date(this.$props.todo.deadline).toISOString().substr(0, 10);
      },
      set(newValue) {
        this.$props.todo.deadline = newValue;
      },
    },
    isLoading: {
      get() {
        return (
          this.loadingState().state &&
          this.loadingState().type == loadingStateTypes.UPDATE_TODO
        );
      },
    },
  },
  methods: {
    ...mapGetters({
      loadingState: "todo/getLoadingState",
    }),
    ...mapActions({
      update: "todo/updateTodo",
      setState: "todo/setModalState",
    }),
    async updateTodo() {
      const result = await this.update({
        id: this.$props.todo._id,
        update: {
          taskName: this.formData.taskName,
          status: this.formData.status,
          deadline: this.deadline,
          description: this.formData.description,
        },
      });
      if (result) {
        this.setState({ state: false, type: "", data: {} });
      }
    },
  },
};
</script>

<style>
</style>