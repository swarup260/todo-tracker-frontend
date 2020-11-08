<template>
  <ul>
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="chat-message align-right"
    >
      {{ message }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    messages: Array,
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
</style>