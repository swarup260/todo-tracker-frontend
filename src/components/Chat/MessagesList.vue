<template>
  <ul>
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="chat-message"
      :class="[message.isSend ? 'align-right' : 'align-left' ]"
    >
      {{ message.message }}
      <div class="time-format">{{ new Date(message.time).toLocaleTimeString()  }}</div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      messages: "chat/getMessages",
    })
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
.chat-message {
  margin: 10px 5px;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 5px;
}
.align-right {
  background-color: #03dac6;
  text-align: right;
  float: right;
  clear: both;
}
.align-left {
  background-color: #018786;
  text-align: left;
  float: left;
  clear: both;
}
.time-format{
  display: flex;
  font-size: 10px;
  color: white;
}
</style>