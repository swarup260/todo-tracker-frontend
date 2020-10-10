<template>
  <v-container>
    <div>
      <!-- {{ project }} -->
    </div>
    <draggable
      :list="project.columns"
      class="row scroll"
      group="a"
      @start="dragging = true"
      @end="dragging = false"
      :animation="100"
      draggable=".item"
    >
      <v-col
        v-for="column in project.columns"
        :key="column._id"
        sm="4"
        md="3"
        lg="2"
        class="item"
      >
        <v-card outlined>
          <v-card-title>
            {{ column.name }}
            <DropDownMeun :column="column" :projectId="project._id" />
            <!-- <span
              class="material-icons position-add-action pa-3"
              @click="showAddNote($event)"
              v-if="!noteNodalState"
            >
              add
            </span> -->
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <AddNote
              v-if="noteModalState"
              :columnId="column._id"
              :projectId="project._id"
            />
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
      </v-col>
      <AddNewColumn />
    </draggable>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import AddNewColumn from "./AddNewColumn";
import AddNote from "../Ticketing/AddNote";
import DropDownMeun from "./DropDownMeun";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    draggable,
    AddNewColumn,
    AddNote,
    DropDownMeun,
  },
  props: {
    project: Object,
  },
  data() {
    return {
      dragging: false,
      isHidden: this.noteNodalState,
    };
  },
  methods: {
    ...mapActions({
      setNoteModalState: "projects/setNoteModalState",
    }),
    showAddNote(event) {
      console.log(event);
      this.setNoteModalState(true);
    },
  },
  computed: {
    ...mapGetters({
      noteModalState: "projects/getNoteModalState",
    }),
  },
};
</script>

<style scoped>
.scroll {
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
}
.position-button {
  position: absolute;
  right: 0;
}
.hidden {
  display: none;
}
.item {
  cursor: move;
}
</style>