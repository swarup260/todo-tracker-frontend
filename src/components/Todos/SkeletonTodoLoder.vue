<template>
  <v-row>
    <v-col cols="12" sm="4" lg="3" v-for="n in 3" :key="n">
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="card"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>