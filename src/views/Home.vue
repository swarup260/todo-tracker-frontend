<template>
  <v-container>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col lg="6">
        <h1>Login</h1>
        <v-card class="pa-2" outlined tile>
          <v-text-field label="email" outlined height="5"></v-text-field>
          <v-text-field label="password" outlined></v-text-field>
          <v-btn href="/signup" target="_blank" text>
            <span class="mr-2">Not Have a account ?</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <v-col>
            <v-btn href="/dashboard" value="center" color="green">Submit</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>