<template>
  <v-container>
    <draggable
      :list="project.columns"
      class="row scroll"
      group="a"
      @change="updateColumnIndex"
      :animation="100"
      draggable=".item"
    >
      <v-col
        v-for="(column, index) in project.columns"
        :key="column._id"
        sm="4"
        md="3"
        lg="2"
        class="item"
      >
        <ProjectColCard
          :column="column"
          :projectId="project._id"
          :columnIndex="index"
        />
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
      stateChange: (state) => state,
    };
  },
  methods: {
    ...mapActions({
      update: "projects/updateColumn",
      updateproject: "projects/updateProjectState",
    }),
    async updateColumnIndex() {
      const columns = this.$props.project.columns;
      const colsupdate = columns.map( (column,index ) => {
       return {
          columnId: column._id,
          update: { position: index },
       }
      });
      let result = await this.update({
        updateData: {
          projectId: this.$props.project._id,
          cols: colsupdate,
        },
        multi: true,
      });
      if (result) {
        this.updateproject(this.$props.project);
      }
    },
    revertBack() {
      return this.stateChange;
    },
  },
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