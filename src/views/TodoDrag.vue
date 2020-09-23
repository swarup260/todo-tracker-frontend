<template>
  <v-container>
    <v-col align="center" justify="center" class="fill-width" ref="startProject">
      <h2>This project doesn’t have any columns or cards.</h2>
      <v-btn color="success right" @click="addColumns" >Add Columns</v-btn>
    </v-col>
    <v-row class="mb-6" no-gutters style="display: none;" ref="starterProject">
      <v-col  v-for="col in columns" :key="col.id">
          <v-card  class="pa-2" outlined>
            <v-card-title> {{ col.name }}</v-card-title>
             
              <v-card-actions>
                <v-btn>Add</v-btn>
              </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
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
export default {
  components: {},
  data() {
    return {
      columns : [
        {
          id : 1,
          name : "Swarup"
        },
        {
          id : 2,
          name : "Swarup"
        },
        {
          id : 3,
          name : "Swarup"
        }
      ]
    };
  },
  methods: {
    addColumns(){
      this.$refs.startProject.style.display = "none";
      this.$refs.starterProject.style.display = "flex";
    }
  },
};
</script>

<style>
</style> 