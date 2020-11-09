<template>
  <v-form ref="sendMessage" @submit.prevent="submitHandler">
    <v-row>
      <v-col cols="10">
        <v-text-field
          outlined
          v-model="message"
          :rules="inputRules"
          @keydown.enter="submitHandler"
          @keydown="userTypingEvent"
          @keyup="userTypingEventStop"
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
import { mapActions } from "vuex";
import { rules } from "@/utils/validation-rule";
export default {
  data() {
    return {
      inputRules: rules.inputRules,
      message: "",
    };
  },
  methods: {
    ...mapActions({
      send: "chat/sendMessage",
    }),
    submitHandler() {
      if (this.$refs.sendMessage.validate()) {
        this.send({ message: this.message, isSend: true, time: new Date() });
        this.$socket.client.emit("chat_message", this.message);
        this.message = "";
      }
    },
    userTypingEvent(event) {
      if (event.target.value.length > 0) {
        this.$socket.client.emit("user_typing", {
          user: "user typing",
          status: true,
        });
      }
    },
    userTypingEventStop() {
      this.$socket.client.emit("user_typing", {
        user: "user typing",
        status: false,
      });
    },
  },
};
</script>

<style>
</style>