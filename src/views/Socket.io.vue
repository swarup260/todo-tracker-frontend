<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="4"> <UserList class="mr-2"/> </v-col>
      <v-col cols="8"> <ChatBox /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserList from "@/components/Chat/UserList.vue";
import ChatBox from "@/components/Chat/ChatBox.vue";
export default {
  components : {
    UserList,
    ChatBox
  }
};
</script>

<style>
</style>