<template>
  <v-card outlined elevation="2">
    <v-card-text class="chatbox">
      <MessagesList />
    </v-card-text>
    <v-card-subtitle>
      <span v-if="userTyping.status">User Typing ...</span>
      <v-divider></v-divider>
      <SendMessageForm />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import MessagesList from "./MessagesList.vue";
import SendMessageForm from "./SendMessageForm.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    MessagesList,
    SendMessageForm,
  },
  computed : {
    ...mapGetters({
      userTyping : "chat/getIsUserTyping"
    })
  }
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