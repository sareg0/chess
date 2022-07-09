<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      count: 1,
    };
  },
});
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  <!-- Should it be a table, or a grid? -->
  <!-- What's the trade off? -->
  <!-- The pieces will be moving -->
  i am a chess board
  <section class="boardAsGrid"></section>
  <section class="boardAsTable"></section>
</template>

<style scoped>
.boardAsGrid {
  background-color: pink;
  border: 5px solid black;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 400px;
  height: 400px;
}

.boardAsTable {
  background-color: darkorchid;
}
</style>
