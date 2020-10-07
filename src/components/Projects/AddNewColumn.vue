<template>
  <v-col class="opacity-item" sm="4" md="4" lg="2">
    <AddNewColumnModal style="position: absolute" />
    <v-hover v-slot:default="{ hover }">
      <v-card
        outlined
        max-width="300"
        :elevation="hover ? 5 : 0"
        :class="{ 'on-hover': hover }"
        @click="openModal()"
        class="card-design"
      >
        <v-card-title>
          <span class="material-icons"> add</span>
          Add New Column
        </v-card-title>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
import AddNewColumnModal from "./AddNewColumnModal";
import { mapActions } from "vuex";
export default {
  components: {
    AddNewColumnModal,
  },
  methods: {
    ...mapActions({
      setModalState: "projects/setModalState",
    }),
    openModal() {
      this.setModalState(true);
    },
  },
};
</script>

<style>
.opacity-item {
  opacity: 0.5;
}
.card-design {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23333' stroke-width='4' stroke-dasharray='15%2c 13' stroke-dashoffset='65' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 4px;
}
</style>