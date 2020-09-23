<template>
  <v-container>
    <v-card
      max-width="344"
      elevation="10"
      class="draggable"
      @mousedown="mouseDownHanlder"
      ref="drag"
    >
      <v-card-title>Drag me</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    mouseDownHanlder(event) {
      this.x = event.clientX;
      this.y = event.clientY;
      // Attach the listeners to `document`
      document.addEventListener("mousemove", this.mouseMoveHandler);
      document.addEventListener("mouseup", this.mouseUpHandler);
    //   console.log(this.x, this.y, this.$refs.drag);
    },
    mouseMoveHandler(event) {
      const dx = event.clientX - this.x;
      const dy = event.clientY - this.y;

      //   Set the position of element
      this.$refs.drag.$el.style.top = `${this.$refs.drag.$el.offsetTop + dy}px`;
      this.$refs.drag.$el.style.left = `${this.$refs.drag.$el.offsetLeft + dx}px`;

      // Reassign the position of mouse
      this.x = event.clientX;
      this.y = event.clientY;
    },
    mouseUpHandler() {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.removeEventListener("mouseup", this.mouseUpHandler);
    },
  },
};
</script>

<style>
.draggable {
  /* Indicate the element draggable */
  cursor: move;
  /* Doesn't allow to select the content inside */
  user-select: none;
  position: absolute;
}
</style>