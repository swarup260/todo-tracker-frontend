<template>
  <v-container>
    <v-col class="fill-width">
      <v-card outlined>
        <v-card-title class="title text-capitalize">
          Socket.IO
          <span class="ml-1">{{
            $socket.connected ? "Connected" : "Disconnected"
          }}</span>
          <span class="ml-1">{{ welcomeMessage }}</span>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col class="fill-width">
      <v-card outlined elevation="5" height="480">
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
            <v-row dense>
              <v-col cols="12">
                <v-card outlined elevation="5" dark height="340" class="over-flow">
                  <v-list-item v-for="(message, i) in messages" :key="i">
                    <v-list-item-content>
                      {{ message }}
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card outlined elevation="5" dark height="100">
                  <v-row dense>
                    <v-col cols="10">
                      <v-text-field
                        class="pa-2"
                        v-model="message"
                        label="Message"
                        outlined
                        clearable
                        @keydown.enter="sendMessage"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn class="ma-3" large @click="sendMessage">
                        <v-icon> mdi-send </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      message: "",
      welcomeMessage: "",
    };
  },
  created() {
    // console.log(this.$socket);
    this.$socket.$subscribe("connected", (payload) => {
      this.welcomeMessage = payload;
    });
  },
  computed: {
    ...mapGetters({
      messages: "chat/getMessages",
    }),
  },
  methods: {
    ...mapActions({
      send: "chat/socket_chatMessage",
    }),
    sendMessage() {
      this.$socket.client.emit("chat_message", this.message);
      // this.send(this.message);
      this.message = "";
    },
  },
};
</script>

<style scoped>
.over-flow {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>