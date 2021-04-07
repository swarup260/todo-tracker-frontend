<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto"
      max-width="344"
      :color="getColor(todo.status)"
      dark
      :elevation="hover ? 20 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-title
        class="headline text-truncate d-inline-block"
        style="max-width: 250px"
      >
        {{ todo.taskName }}
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              class="position-right-action pa-2"
              v-bind="attrs"
              v-on="on"
              :class="{ 'show-action-btn': hover }"
              @click="deleteTodo(todo._id)"
              :loading="isDeleteLoading"
            >
              <span class="material-icons"> delete </span>
            </v-btn>
          </template>
          <span>delete todo</span>
        </v-tooltip>
      </v-card-title>
      <v-card-subtitle v-if="!todo.status" class="caption" :class="deadlineFormat.class"
        >{{ deadlineFormat.text }}
      </v-card-subtitle>
      <v-card-text>
        <div class="text--primary text-truncate" style="max-width: 300px">
          {{ todo.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="!todo.status"
          @click="updateStatus(todo._id)"
          text
          :loading="isLoading"
          >Mark As Complete</v-btn
        >
        <v-btn
          :class="{ 'show-btns': hover }"
          color="transparent"
          @click="openModal(todo)"
          text
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
import { modalTypes,loadingStateTypes } from "@/api/types.js";
export default {
  props: {
    todo: Object,
  },
  data() {
    return {
    };
  },
  computed: {
    deadlineFormat: {
      get() {
        return this.getDeadlineFormat(this.$props.todo.deadline);
      },
    },
    isLoading: {
      get() {
        return (
          this.loadingState().state &&
          this.loadingState().type == loadingStateTypes.UPDATE_TODO
        );
      },
    },
    isDeleteLoading : {
      get(){
        return (
          this.loadingState().state &&
          this.loadingState().type == loadingStateTypes.DELETE_TODO
        );
      }
    }
  },
  methods: {
    ...mapGetters({
      loadingState: "todo/getLoadingState",
    }),
    ...mapActions({
      delete: "todo/deleteTodo",
      update: "todo/updateTodo",
      setState: "todo/setModalState",
    }),
    getColor(status) {
      return status ? "green" : "red";
    },
    getDeadlineFormat(deadline) {
      const currentDate = new Date();
      const deadlineDate = new Date(deadline);
      const dayDiff = Math.round(
        (deadlineDate - currentDate) / (1000 * 3600 * 24)
      );
      if (dayDiff > 0) {
        return {
          text: `${dayDiff} days remaining`,
          class: "",
        };
      }
      return {
        text: `you have past the deadline`,
        class: "font-weight-black",
      };
    },
    
    async updateStatus(id) {
      await this.update({
        id: id,
        update: {
          status: true,
        },
      });
    },
    async deleteTodo(id) {
      await this.delete(id);
    },
    openModal(data) {
      this.setState({
        state: true,
        type: modalTypes.UPDATE_TODO_MODAL,
        data: data,
      });
    },
  },
};
</script>

<style scoped>
.position-right-action {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 10px;
  opacity: 0;
  cursor: pointer;
}
.position-left-action {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 10px;
  opacity: 0;
  cursor: pointer;
}
.show-action-btn {
  opacity: 1;
}
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.item {
  cursor: pointer;
}
.material-icons {
  font-size: 20px;
}
</style>