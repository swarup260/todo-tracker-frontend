<template>
  <!-- <draggable :list="project.columns" class="row scroll" group="a">
    <v-col v-for="column in project.columns" :key="column._id" cols="3">
      <v-card outlined>
        <v-card-title>
          {{ column.columnName }}
        </v-card-title>
        <v-card-text>
          <draggable :list="list" group="b">
            <v-row no-gutters v-for="row in list" :key="row.id">
              <v-col>
                <v-card outlined>
                  <v-card-title>{{ row }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </draggable>
        </v-card-text>
      </v-card>
    </v-col>
  </draggable> -->
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-card outlined>
          <draggable :list="list" group="b">
            <v-row no-gutters v-for="(row, index) in list" :key="index">
              <v-col>
                <v-card outlined class="ma-2">
                  <v-card-title>{{ row }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </draggable>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card outlined>
          <draggable :list="anotherList" group="b">
            <v-row no-gutters v-for="(row, index) in anotherList" :key="index">
              <v-col>
                <v-card outlined class="ma-2">
                  <v-card-title>{{ row }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </draggable>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: {
    project: Object,
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5,8,51,52,57,68,23,45,40,41,42],
      anotherList: [7, 23, 56],
    };
  },
  components: {
    draggable,
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