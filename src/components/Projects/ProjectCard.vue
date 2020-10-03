<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      outlined
      color="primary"
      :elevation="hover ? 20 : 2"
      :class="{ 'on-hover': hover }"
      @click="redirectProjectPage(project._id)"
    >
      <v-card-title
        class="headline text-truncate d-inline-block"
        style="max-width: 250px"
      >
        {{ project.projectName }}
      </v-card-title>
      <v-card-text class="text--primary text-truncate" style="max-width: 300px">
        {{ project.description }}
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    project: Object,
  },
  methods: {
    redirectProjectPage(id) {
      this.$router.push(`project/${id}`);
    },
  },
};
</script>

<style>
</style>