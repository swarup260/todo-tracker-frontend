<template>
  <v-container>
    <div>
      <!-- {{ project }} -->
    </div>
    <draggable
      :list="project.columns"
      class="row scroll"
      group="a"
      @change="updateColumnIndex"
      :animation="100"
      draggable=".item"
      :move="revertBack"
    >
      <v-col
        v-for="(column,index) in project.columns"
        :key="column._id"
        sm="4"
        md="3"
        lg="2"
        class="item"
      >
        <ProjectColCard :column="column" :projectId="project._id" :columnIndex="index" />
      </v-col>
      <AddNewColumn />
    </draggable>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import AddNewColumn from "./AddNewColumn";
import ProjectColCard from "./ProjectColCard";
import { mapActions } from "vuex";
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
      stateChange: true,
    };
  },
  methods: {
    ...mapActions({
      update: "projects/updateColumn",
      updateproject: "projects/updateProjectState",
    }),
    async updateColumnIndex(event) {
      const { oldIndex, newIndex } = event.moved;
      const columns = this.$props.project.columns;
      const columnOldIndex = {
        columnId: columns[oldIndex]._id,
        update: { position: oldIndex },
      };
      const columnNexIndex = {
        columnId: columns[newIndex]._id,
        update: { position: newIndex },
      };
      let result = await this.update({
        newData: {
          projectId: this.$props.project._id,
          cols: [columnOldIndex, columnNexIndex],
        },
        multiUpdate: true,
      });
      if (result) {
        this.updateproject(this.$props.project);
      }
    },
    revertBack() {
      return this.stateChange;
    },
  },
  computed: {},
};
</script>

<style scoped>
.scroll {
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
  height: 900px;
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