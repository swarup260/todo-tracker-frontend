<template>
  <v-hover v-slot:default="{ hover }">
    <v-card outlined :class="{ 'on-hover': hover }" :elevation="hover ? 3 : 1">
      <v-card-title>
        {{ column.name }}
        <DropDownMeun :column="column" :projectId="projectId" />
      </v-card-title>
      <v-card-subtitle
        class="mt-1"
        v-if="noteModalState.isActive && noteModalState.columnID == column._id"
      >
        <AddNote :columnId="column._id" :projectId="projectId" />
      </v-card-subtitle>
      <v-card-text>
        <draggable :list="column.notes" group="b">
          <v-row no-gutters v-for="note in column.notes" :key="note._id">
            <NoteCard :note="note" />
          </v-row>
        </draggable>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import DropDownMeun from "./DropDownMeun";
import AddNote from "../Ticketing/AddNote";
import NoteCard from "../Ticketing/NoteCard";
import { mapGetters } from "vuex";
export default {
  components: {
    AddNote,
    DropDownMeun,
    NoteCard,
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