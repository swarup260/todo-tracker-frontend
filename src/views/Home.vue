<template>
  <v-container>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col lg="6">
        <h1>Login</h1>
        <v-form ref="loginForm" @submit.prevent="submitHandler">
          <v-card class="pa-2" outlined tile>
            <v-text-field
              label="email"
              v-model="userInput.email"
              :rules="emailRules"
              outlined
              height="5"
            ></v-text-field>
            <v-text-field
              label="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="userInput.password"
              :rules="inputRules"
              outlined
            ></v-text-field>
            <v-btn href="/signup" target="_blank" text>
              <span class="mr-2">Not Have a account ?</span>
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-col>
              <v-btn color="error" @click="reset">Reset</v-btn>
              <v-btn color="success" class="ml-3" type="submit">Submit</v-btn>
            </v-col>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <!-- Show Overlay Loader -->
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
/* 
snackbar show to state change
https://dev.to/viniciuskneves/watch-for-vuex-state-changes-2mgj
*/
import { rules } from "../utils/validation-rule";
import { mapActions,mapGetters } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      userInput: {
        email: "",
        password: "",
      },
      showPassword: false,
      emailRules: rules.emailRules,
      inputRules: rules.inputRules,
      overlay: false,
    };
  },
  computed :{
    isLoading : {
      get(){
        return this.loadingState();
      }
    }
  },
  methods: {
    ...mapGetters({
      loadingState: "auth/getLoadingState",
    }),
    ...mapActions({
      login: "auth/login",
      setLoadingState : "auth/setLoadingState"
    }),
    async submitHandler() {
      if (this.$refs.loginForm.validate()) {
        this.setLoadingState(true);
        let result = await this.login({ ...this.userInput });
        if (result) {
          this.setLoadingState(false);
          this.$router.push("Dashboard");
        }
      }
    },
    reset() {
      this.$refs.loginForm.reset();
    },
  },
};
</script>