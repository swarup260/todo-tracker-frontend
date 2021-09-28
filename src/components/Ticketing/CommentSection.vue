<template>
  <v-container>
    <span class="title pt-10">Activity</span>
    <v-form ref="AddNewComment" @submit.prevent="AddNewComment">
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
    <p
      class="ma-2 chat-box"
      v-for="(comment, index) in note.comments"
      :key="index"
    >
      <span v-show="!showEditComment" class="subtitle-2">
        {{ comment.comment }}
      </span>
      <v-text-field
        v-if="showEditComment"
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
export default {
  props: {
    note: Object,
  },
  data() {
    return {
      inputRules: rules.inputRules,
      showEditComment: false,
      editCommentText: "",
      commentText: "",
    };
  },
  methods: {
    async AddNewComment() {
      if (!this.$refs.AddNewComment.validate()) {
        return false;
      }
      const { _id,columnRef } = this.$props.note;
      const result = await this.addComment({
        noteId: _id,
        comment: this.commentText,
        columnRef : columnRef
      });
      if (result) {
        this.commentText = "";
      }
    },
    editComment(index) {
      const { comments } = this.$props.note;
      this.editCommentText = comments[index].comment;
      this.showEditComment = !this.showEditComment;
    },
    async updateComment(index) {
      const { comments } = this.$props.note;
      const { _id } = this.$props.note;
      const commentId = comments[index]._id;
      const result = await this.updateComment({
        noteId: _id,
        commentId: commentId,
        update: {
          comment: this.editCommentText,
        },
      });

      if (result) {
        this.editCommentText = "";
        this.showEditComment = !this.showEditComment;
      }
    },
    async deletComment(index) {
      const { comments } = this.$props.note;
      const { _id } = this.$props.note;
      const commentId = comments[index]._id;
      await this.updateComment({
        noteId: _id,
        commentId: commentId,
      });
      // comments.splice(index, 1);
    },
  },
};
</script>

<style>
</style>