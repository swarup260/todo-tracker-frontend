<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <h1>Todo !</h1>
      <v-spacer></v-spacer>
      <span v-if="user">{{ user.username }}</span>
    </v-app-bar>

    <v-main>
      <v-snackbar v-model="snackbar" right top timeout="5000" :color="snackbarColor">
        {{ message.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { getData } from "@/utils/localStorage";
export default {
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
  }),
  watch: {
    message(newValue) {
      if (newValue) {
        this.snackbarColor = newValue.type;
        this.snackbar = true;
      }
    },
  },
  computed: {
    ...mapState({
      message : state => state.message,
      user : state => state.auth.user
    }),
    user : {
      get(){
         return getData('user');
      }
    }
  },
  beforeDestroy() {
    this.unwatch();
  },
};
</script>

