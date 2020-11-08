const defaultState = {
  messages: [],
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    SOCKET_CHAT_MESSAGE(state, message) {
      state.messages.push(message);
    },
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    socket_chatMessage({ commit }, message) {
      this._vm.$socket.boardcast.emit('chat_message', message);
    },
  },
};
