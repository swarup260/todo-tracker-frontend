<template>
  <v-container>
    <v-col class="fill-width">
      <v-card outlined>
        <v-card-title class="title text-capitalize">
          Socket.IO
          <span class="ml-1">{{
            $socket.connected ? "Connected" : "Disconnected"
          }}</span>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col class="fill-width fill-height">
      <v-card outlined>
        <v-row>
          <v-col cols="4">
            <v-list dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="8">
            <v-card outlined>
              
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
    };
  },
  created() {
    console.log(this.$socket);
  },
};
</script>

<style>
</style>