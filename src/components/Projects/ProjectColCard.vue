<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      outlined
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 3 : 1"
      :color="column.color"
    >
      <v-card-title>
        {{ column.name }}
        <DropDownMeun
          :column="column"
          :projectId="projectId"
          style="position: absolute"
        />
      </v-card-title>
      <v-card-subtitle
        v-if="noteModalState.isActive && noteModalState.columnID == column._id"
      >
        <AddNote :columnId="column._id" :projectId="projectId" class="mt-2" />
      </v-card-subtitle>
      <v-card-text>
        <draggable
          :list="column.notes"
          group="b"
          @change="updateNoteIndex($event, column._id, column.notes)"
          @end="revertBack"
        >
          <v-row
            no-gutters
            v-for="(note, index) in column.notes"
            :key="note._id"
          >
            <NoteCard :note="note" :noteIndex="index" :columnId="column._id" />
          </v-row>
        </draggable>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import draggable from "vuedraggable";
import DropDownMeun from "./DropDownMeun";
import AddNote from "../Ticketing/AddNote";
import NoteCard from "../Ticketing/NoteCard";
import { mapActions, mapGetters } from "vuex";
import { getData } from "@/utils/localStorage";
export default {
  components: {
    AddNote,
    DropDownMeun,
    NoteCard,
    draggable,
  },
  props: {
    column: Object,
    projectId: String,
    columnIndex: Number,
  },
  data() {
    return {
      stateChange: true,
    };
  },
  computed: {
    ...mapGetters({
      noteModalState: "projects/getNoteModalState",
    }),
  },
  methods: {
    ...mapActions({
      updateColumn: "projects/updateColumn",
      updateProjectState: "projects/updateProjectState",
    }),
    async updateNoteIndex(event, id, notes) {
      console.log({
        projectId: this.$props.projectId,
        columnId: id,
        update: {
          notes: notes.map((note, index) => {
            return { noteId: note._id, position: index };
          }),
        },
      });
      const result = await this.updateColumn({
        updateData: {
          projectId: this.$props.projectId,
          columnId: id,
          update: {
            notes: notes.map((note, index) => {
              return { noteId: note._id, position: index };
            }),
          },
        },
        multi: false,
      });
      if (result) {
        this.updateColumnNotes(notes);
      }
      this.stateChange = result;
    },
    revertBack() {
      return true;
    },
    updateColumnNotes(notes) {
      const index = this.$props.columnIndex;
      const project = getData("project");
      project.columns[index].notes = notes;
      this.updateProjectState(project);
    },
  },
};
</script>

<style>
</style>