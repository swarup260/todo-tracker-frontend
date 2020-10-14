<template>
  <v-row class="mb-6" justify="center" no-gutters>
    <v-col cols="12">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <v-btn-toggle color="primary" dense group multiple>
          <v-btn
            icon
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
            ><span class="material-icons"> code </span></v-btn
          >
          <v-btn
            icon
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
            ><span class="material-icons"> format_bold </span></v-btn
          >
          <v-btn
            icon
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
            ><span class="material-icons"> format_italic </span></v-btn
          >
          <v-btn
            icon
            :class="{ 'is-active': isActive.todo_list() }"
            @click="commands.todo_list"
            ><span class="material-icons"> list_alt </span></v-btn
          >
          <v-btn
            icon
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
            >H1</v-btn
          >
          <v-btn
            icon
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            >H2</v-btn
          >
          <v-btn
            icon
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
            >H3</v-btn
          >
          <v-btn
            icon
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <span class="material-icons"> format_quote </span>
          </v-btn>
        </v-btn-toggle>
      </editor-menu-bar>
    </v-col>
    <editor-content
      class="editor-style editor__content"
      :editor="editor"
    />
  </v-row>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  CodeBlock,
  HardBreak,
  Heading,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Blockquote,
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new TodoItem({
            nested: true,
          }),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Blockquote(),
        ],
        content: "Description",
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        },
      }),
    };
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.editor-style {
  border: 2px solid black;
  border-radius: 5px;
  height: 150px;
  padding: 10px 15px;
  display: flex;
  flex-grow: 1;
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
}
.editor-style :focus {
  outline: none;
}
ul[data-type="todo_list"] {
  padding-left: 0;
}
li[data-type="todo_item"] {
  display: flex;
  flex-direction: row;
}
.todo-checkbox {
  border: 2px solid black;
  height: 0.9em;
  width: 0.9em;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: transparent;
  transition: 0.4s background;
}
.todo-content {
  flex: 1;
  > p:last-of-type {
    margin-bottom: 0;
  }
  > ul[data-type="todo_list"] {
    margin: 0.5rem 0;
  }
}
li[data-done="true"] {
  > .todo-content {
    > p {
      text-decoration: line-through;
    }
  }
  > .todo-checkbox {
    background-color: black;
  }
}
li[data-done="false"] {
  text-decoration: none;
}
</style>