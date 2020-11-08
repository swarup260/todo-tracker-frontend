<template>
  <v-card outlined elevation="2">
    <v-card-text class="chatbox">
      <MessagesList :messages="messages" />
    </v-card-text>
    <v-card-subtitle>
      <v-divider></v-divider>
      <SendMessageForm />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import MessagesList from "./MessagesList.vue";
import SendMessageForm from "./SendMessageForm.vue";
export default {
  components: {
    MessagesList,
    SendMessageForm
  },
  data() {
    return {
      messages: ["hw r u ? ", "i'm fine"],
    };
  },
};
</script>

<style scoped>
.chatbox {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 350px;
}
</style>