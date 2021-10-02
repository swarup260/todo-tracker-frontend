<template>
  <v-container>
    <span class="title pt-10">Activity</span>
    <v-form ref="AddNewComment" @submit.prevent="addNewComment">
      <v-text-field
        v-model="commentText"
        :rules.sync="inputRules"
        label="Comment"
        placeholder="Write a comment..."
        outlined
        class="mt-5"
      ></v-text-field>
      <v-btn color="green" type="submit"> Save </v-btn>
    </v-form>
    <br />
    <p class="ma-2 chat-box" v-for="(comment, index) in comments" :key="index">
      <span v-show="hideComment && activeIndex != index" class="subtitle-2">
        {{ comment.comment }}
      </span>
      <v-text-field
        v-if="activeIndex == index"
        v-model="editCommentText"
        :rules="inputRules"
        label="Comment"
        placeholder="Write a comment..."
        outlined
        @keydown.enter="updateComment(index)"
        class="mt-5"
      ></v-text-field>
      <v-icon color="green" small @click="editComment(index)"> edit </v-icon>
      <v-icon class="ml-1" color="red" small @click="deletComment(index)">
        delete
      </v-icon>
      <br />
      Added On :
      <span class="subtitle-2"> {{ new Date(comment.createdAt) }}</span>
      <br />
      <span v-if="comment.updatedAt">
        Updated On :
        <span class="subtitle-2"> {{ new Date(comment.updatedAt) }}</span>
      </span>
    </p>
  </v-container>
</template>

<script>
import { rules } from "../../utils/validation-rule";
import { mapActions,mapGetters } from "vuex";
export default {
  props: {
    note: Object
  },
  data() {
    return {
      inputRules: rules.inputRules,
      hideComment: true,
      editCommentText: "",
      commentText: "",
      activeIndex: -1,
    };
  },
  methods: {
    ...mapActions({
      add: "projects/addComment",
      update: "projects/udpateComment",
      delete: "projects/deleteComment",
    }),
    async addNewComment() {
      if (!this.$refs.AddNewComment.validate()) {
        return false;
      }
      const { _id, columnRef } = this.$props.note;
      const result = await this.add({
        noteId: _id,
        comment: this.commentText,
        columnRef: columnRef,
      });
      if (result) {
        this.commentText = "";
      }
    },
    editComment(index) {
      /* SET THE INPUT TEXT  */
      this.editCommentText =
        this.editCommentText == "" ? this.comments[index].comment : "";
      /* SET THE ACTIVE INDEX  */
      this.activeIndex = this.activeIndex == -1 ? index : -1;
    },
    async updateComment(index) {
      const { columnRef } = this.$props.note;
      console.log(this.$props.note);
      const { _id } = this.$props.note;
      const commentId = this.comments[index]._id;
      const result = await this.update({
        noteId: _id,
        commentId: commentId,
        columnRef: columnRef,
        update: {
          comment: this.editCommentText,
        },
      });

      if (result) {
        this.editCommentText = "";
        this.activeIndex = -1;
      }
    },
    async deletComment(index) {
      const { comments, columnRef } = this.$props.note;
      const { _id } = this.$props.note;
      const commentId = comments[index]._id;
      await this.delete({
        noteId: _id,
        commentId: commentId,
        columnRef: columnRef,
      });
    },
  },
  computed : {
    ...mapGetters({
      getComments : "projects/getComments"
    }),
    comments : {
      get(){
        return this.getComments
      },
      set(newVal){
        console.log(newVal);
      }
    }
  }
};
</script>

<style>
</style>