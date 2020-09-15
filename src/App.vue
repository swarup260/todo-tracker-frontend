<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <h1>Todo !</h1>
      <v-spacer></v-spacer>
      <span v-if="getUser.username" class="flex-row d-flex">
        <span>{{ getUser.username }}</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" class="material-icons ml-3 pointer" @click="logout">login</span>
          </template>
          <span>Login</span>
        </v-tooltip>
      </span>
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
import { mapState, mapActions, mapGetters } from "vuex";
import { clearData } from "@/utils/localStorage";
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
      message: (state) => state.message,
    }),
    ...mapGetters({
      getUser: "auth/getUser",
    }),
  },
  beforeDestroy() {
    this.unwatch();
  },
  methods: {
    ...mapActions({
      resetGlobalState: "resetGlobalState",
    }),
    logout() {
      this.resetGlobalState();
      clearData();
      this.$router.push("/");
    },
  },
};
</script>
<style lang="css" scoped>
.pointer {
  cursor: pointer;
}
</style>