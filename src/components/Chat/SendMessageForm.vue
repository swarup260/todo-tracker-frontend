<template>
  <v-form ref="sendMessage" @submit.prevent="submitHandler">
    <v-row>
      <v-col cols="10">
        <v-text-field
          outlined
          v-model="message"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn elevation="2" large color="primary" class="ma-1" type="submit"
          >Send</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { rules } from "@/utils/validation-rule";
export default {
  data() {
    return {
      inputRules: rules.inputRules,
      message: "",
    };
  },
  message: {
    submitHandler() {
      if (this.$refs.sendMessage.validate()) {
        console.log(this.message);
        this.message = "";
      }
    },
  },
};
</script>

<style>
</style>