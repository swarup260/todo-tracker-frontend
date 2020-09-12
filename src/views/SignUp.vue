<template>
  <v-container>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col lg="6">
        <h1>SignUp</h1>
        <v-form ref="signUpForm" @submit.prevent="submitHandler">
          <v-card class="pa-2" outlined tile>
            <v-text-field
              label="username"
              v-model="userInput.username"
              :rules="inputRules"
              outlined
              height="5"
            ></v-text-field>
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
            <v-col>
              <v-btn color="error"  @click="reset">Reset</v-btn>
              <v-btn color="success" class="ml-3" type="submit">Submit</v-btn>
            </v-col>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {rules} from "../utils/validation-rule";
import { mapActions } from 'vuex'

export default {
  name: "SignUp",
  data() {
    return {
      userInput: {
        username: "",
        email: "",
        password: "",
      },
      showPassword : false,
      emailRules: rules.emailRules,
      inputRules: rules.inputRules,
    };
  },
  methods: {
    ...mapActions({
      register : 'auth/register'
    }),
    async submitHandler() {
      if (this.$refs.signUpForm.validate()) {
        console.log({ ...this.userInput });
        let result = await this.register({ ...this.userInput });
         if (result) {
            this.$router.push('Dashboard');
         }
      }
    },
    reset() {
      this.$refs.loginForm.reset();
    },
  },
};
</script>