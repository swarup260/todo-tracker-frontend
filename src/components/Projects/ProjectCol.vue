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
        <ProjectColCard :column="column" :projectId="project._id" />
      </v-col>
      <AddNewColumn />
    </draggable>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import AddNewColumn from "./AddNewColumn";
import ProjectColCard from "./ProjectColCard";
export default {
  components: {
    draggable,
    AddNewColumn,
    ProjectColCard,
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
  methods: {},
  computed: {},
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