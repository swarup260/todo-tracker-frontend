<template>
  <v-container>
    <v-menu bottom right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" class="position-add-action mr-3">
          <span class="material-icons"> more_vert </span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-title @click="item.callback">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <UpdateColumnModal :projectId="projectId" :column="column" />
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import UpdateColumnModal from "./UpdateColumnModal";
import { modalTypes } from "@/api/types";
export default {
  components: {
    UpdateColumnModal,
  },
  props: {
    column: Object,
    projectId: String,
  },
  data() {
    return {
      items: [
        {
          title: "Add Note",
          callback: this.addNote,
        },
        {
          title: "Edit Column",
          callback: this.editColumn,
        },
        {
          title: "Delete Column",
          callback: this.deleteColumn,
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setNoteModalState: "projects/setNoteModalState",
      setModalState: "projects/setModalState",
      delete: "projects/deleteColumn",
    }),
    addNote() {
      this.setNoteModalState({
        isActive: true,
        columnID: this.$props.column._id,
      });
    },
    editColumn() {
      this.setModalState({
        isActive: true,
        type: modalTypes.UPDATE_COL_MODAL,
        data: this.$props.column,
      });
    },
    async deleteColumn() {
      await this.delete({
        projectId: this.$props.projectId,
        columnId: this.$props.column._id,
      });
    },
  },
};
</script>

<style>
.position-add-action {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  cursor: pointer;
}
</style>