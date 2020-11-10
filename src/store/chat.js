const defaultState = {
  messages: [],
  userTyping: {},
  boardcastMessage: ""
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    SOCKET_CHAT_MESSAGE(state, message) {
      state.messages.push(message);
    },
    SOCKET_USER_TYPING(state, object) {
      state.userTyping = object
    },
    SOCKET_JOIN_ROOM(state, boardcastMessage) {
      state.boardcastMessage = boardcastMessage
    }
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getIsUserTyping(state) {
      console.log(state);
      return state.userTyping;
    },
    getBoardcastMessage(state) {
       return state.boardcastMessage
    }
  },
  actions: {
    sendMessage({
      commit
    }, data) {
      commit('SOCKET_CHAT_MESSAGE', data);
    },
  },
};