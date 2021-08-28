<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <v-app-bar-title >
        <v-icon
      large
      color="green darken-2"
    >
      mdi-card-bulleted
    </v-icon>
      </v-app-bar-title>
      <h3 class="ml-10">
        <router-link class="font-italic white--text" to="/dashboard">Todo</router-link>
      </h3>
      <h3 class="ml-3">
        <router-link class="font-italic white--text" to="/projects">Projects</router-link>
      </h3>
      <v-spacer></v-spacer>
      <span v-if="user.username" class="flex-row d-flex">
        <span class="mr-1">{{ user.username }} </span>
        <v-divider vertical></v-divider>
        <!-- <span class="mr-1 ml-1">
          {{ $socket.connected ? "You Are Online" : "You Are Offline" }}
          </span> -->
        <v-divider vertical></v-divider>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              class="material-icons ml-3 pointer"
              @click="logout"
              >login</span
            >
          </template>
          <span>Logout</span>
        </v-tooltip>
      </span>
    </v-app-bar>

    <v-main>
      <v-snackbar
        v-model="snackbar"
        right
        top
        timeout="5000"
        :color="snackbarColor"
        v-if="message.message"
      >
        {{ message.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>

      <!-- NetWork Error Dailog -->

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline"> Network Error </v-card-title>

          <v-card-text class="headline"> Server Down Please Try Again Later !! </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1"
            text @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { clearData } from "@/utils/localStorage";
export default {
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
    dialog: false,
  }),
  watch: {
    message(newValue) {
      if (newValue.message == "Network Error") {
          this.dialog = true;
          return;
      }
      if (newValue) {
        this.snackbarColor = newValue.type;
        this.snackbar = true;
      }
    },
  },
  computed: {
    ...mapState({
      message: (state) => state.message,
    }),
    ...mapGetters({
      getUser: "auth/getUser",
    }),
    user() {
      return this.getUser;
    },
  },
  beforeDestroy() {
    this.unwatch();
  },
  methods: {
    ...mapActions({
      resetGlobalState: "resetGlobalState",
    }),
    logout() {
      clearData();
      this.resetGlobalState();
      this.$router.push("/");
    },
  },
};
</script>
<style lang="css" scoped>
.pointer {
  cursor: pointer;
}
a{
  text-decoration: none !important;
}
</style>