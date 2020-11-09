const defaultState = {
  messages: [],
  userTyping : {}
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    SOCKET_CHAT_MESSAGE(state, message) {
      state.messages.push(message);
    },
    SOCKET_USER_TYPING(state,object){
      state.userTyping = object
    }
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getIsUserTyping(state){
      console.log(state.userTyping);
      return state.userTyping;
    }
  },
  actions: {
    sendMessage({
      commit
    }, data) {
      commit('SOCKET_CHAT_MESSAGE',data);
    },
  },
};