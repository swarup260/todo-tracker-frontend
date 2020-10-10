<template>
  <v-card outlined>
    <v-card-title>
      {{ column.name }}
      <DropDownMeun :column="column" :projectId="projectId" />
    </v-card-title>
    <v-card-subtitle class="mt-1" v-if="noteModalState">
      <AddNote :columnId="column._id" :projectId="projectId" />
    </v-card-subtitle>
    <v-card-text>
      <draggable :list="column.notes" group="b">
        <v-row no-gutters v-for="row in column.notes" :key="row._id">
          <v-col>
            <v-card outlined>
              <v-card-title>{{ row.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </draggable>
    </v-card-text>
  </v-card>
</template>

<script>
import DropDownMeun from "./DropDownMeun";
import AddNote from "../Ticketing/AddNote";
import { mapGetters } from "vuex";
export default {
  components: {
    AddNote,
    DropDownMeun,
  },
  props: {
    column: Object,
    projectId: String,
  },
  computed: {
    ...mapGetters({
      noteModalState: "projects/getNoteModalState",
    }),
  },
};
</script>

<style>
</style>