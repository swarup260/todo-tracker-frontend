<template>
  <v-container>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col lg="6">
        <h1>Login</h1>
        <v-card class="pa-2" outlined tile>
          <v-text-field label="username" outlined height="5"></v-text-field>
          <v-text-field label="email" outlined height="5"></v-text-field>
          <v-text-field label="password" outlined></v-text-field>
          <v-col>
            <v-btn value="center" color="green">Submit</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>