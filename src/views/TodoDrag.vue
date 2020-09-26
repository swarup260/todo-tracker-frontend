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
      <v-btn color="success right" @click="addColumns">Add Columns</v-btn>
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
            <!-- <v-text-field outlined v-model="column.name"> </v-text-field>
            <v-btn>TEXT</v-btn> -->
          </v-card-title>
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
      <div class="col col-3" slot="footer" role="group">
        <v-card outlined>
          <v-card-title> Add Columns </v-card-title>
        </v-card>
      </div>
    </draggable>
  </v-container>
  <!-- <v-container>
    <v-row class="mb-6" justify="center" align="center" no-gutters>
      <v-col cols="12" sm="4">
        
        <v-btn small color="primary right">Add Columns</v-btn>
      </v-col>
    </v-row>
    <div></div>
    <v-row class="mb-6" no-gutters></v-row>
  </v-container> -->
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      columns: [
        {
          _id: 1,
          name: "COL",
          rows: [
            {
              id: 1,
              name: "S-COL",
            },
            {
              id: 2,
              name: "M-COL",
            },
            {
              id: 3,
              name: "D-COL",
            },
          ],
        },
        {
          _id: 2,
          name: "COL2",
          rows: [
            {
              id: 1,
              name: "S",
            },
            {
              id: 2,
              name: "M",
            },
            {
              id: 3,
              name: "d",
            },
          ],
        },
        {
          _id: 1,
          name: "COL3",
          rows: [
            {
              id: 1,
              name: "S",
            },
            {
              id: 2,
              name: "M",
            },
            {
              id: 3,
              name: "d",
            },
          ],
        },
      ],
    };
  },
  methods: {
    addColumns() {
      this.$refs.startProject.style.display = "none";
      this.$refs.starterProject.style.display = "flex";
    },
  },
};
</script>

<style>
.scroll {
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
}
</style> 