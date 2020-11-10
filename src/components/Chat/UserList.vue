<template>
  <v-list dense>
    <v-list-item-group
      v-model="selectedItem"
      color="primary"
      mandatory
      tag="v-flex"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        v-slot="{ active, toggle }"
      >
        <v-list-item-icon>
          <v-icon :input-value="active" @click="toggle">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 0,
      items: ["swarup", "rocks"],
    };
  },
};
</script>

<style scoped>
</style>