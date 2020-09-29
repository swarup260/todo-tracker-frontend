<template>
  <v-container>
    <v-col
      align="center"
      justify="center"
      class="fill-width"
      ref="startProject"
      style="display: none"
    >
      <h2 class="ma-5">This project doesn’t have any columns or cards.</h2>
      <v-btn color="success right" @click="addNewProject">Add Columns</v-btn>
    </v-col>
    <draggable
      :list="columns"
      class="row scroll"
      group="a"
      ref="starterProject"
    >
      <v-col v-for="column in columns" :key="column._id" cols="3">
        <v-card outlined>
          <v-card-title>
            {{ column.name }}
            <v-btn
              class="ma-2 position-button"
              tile
              large
              color="teal"
              icon
              @click="isHidden = !isHidden"
            >
              <span class="material-icons"> add </span>
            </v-btn>
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <AddNote
              :class="{ hidden: isHidden }"
              :id="column._id"
              @cancel="addNewRow"
            />
          </v-card-subtitle>
          <v-card-text>
            <draggable :list="column.rows" group="b">
              <v-row no-gutters v-for="row in column.rows" :key="row.id">
                <v-col>
                  <v-card class="mb-1" outlined>
                    <v-card-title>{{ row.name }}</v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <div class="col col-3" slot="footer" role="group">
        <v-card outlined>
          <v-card-title> Add Columns </v-card-title>
        </v-card>
      </div> -->
    </draggable>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters, mapMutations, mapActions } from "vuex";
import AddNote from "@/components/Ticketing/AddNote";
export default {
  components: {
    draggable,
    AddNote,
  },
  data() {
    return {
      isHidden: true,
      newRowName: "",
    };
  },
  computed: {
    columns: {
      get() {
        return this.getColumns();
      },
      set(value) {
        this.SET_COLUMNS(value);
      },
    },
  },
  methods: {
    ...mapGetters({
      getColumns: "projects/getColumns",
    }),
    ...mapActions({
      fetchColumn: "projects/fetchColumn",
    }),
    ...mapMutations(["SET_COLUMNS"]),
    addNewProject() {
      this.$refs.startProject.style.display = "none";
      this.$refs.starterProject.$el.style.display = "flex";
    },
    addTicket() {},
    addNewRow(data) {
      if (!data.name) {
        return false;
      }
      this.columns.forEach((element) => {
        if (element._id == data.id) {
          element.rows.push({
            id: Math.floor(Math.random(1, 100)),
            name: data.name,
          });
        }
      });
    },
    closeForm(data) {
      return true;
    },
  },
  created() {
    this.fetchColumn();
  },
};
</script>

<style>
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
</style> 