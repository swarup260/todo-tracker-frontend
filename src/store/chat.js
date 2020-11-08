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
    sendMessage({
      commit
    }, data) {
      commit('SOCKET_CHAT_MESSAGE',data);
    },
  },
};