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
              :loading="isLoadingDelete"
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
import { mapActions } from "vuex";
import { modalTypes } from "@/api/types.js";
export default {
  props: {
    todo: Object,
  },
  data() {
    return {
      isLoading: false,
      isLoadingDelete: false,
    };
  },
  computed: {
    deadlineFormat: {
      get() {
        return this.getDeadlineFormat(this.$props.todo.deadline);
      },
    },
  },
  methods: {
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
      this.isLoading = true;
      const result = await this.update({
        id: id,
        update: {
          status: true,
        },
      });
      if (result) {
        this.isLoading = false;
      }
    },
    async deleteTodo(id) {
      this.isLoadingDelete = true;
      const result = await this.delete(id);
      if (result) {
        this.isLoadingDelete = false;
      }
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