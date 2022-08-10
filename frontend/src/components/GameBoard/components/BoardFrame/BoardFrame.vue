<template>
  <!-- <b
    class="cell letter-row"
    v-for="(column, columnIndex) in columns"
    :key="`top ${columnIndex}`"
    :style="{
      gridColumnStart: columnIndex + 2,
    }"
    >{{ column }}</b
  >
  <b
    class="cell number-column"
    :style="{
      gridRowStart: rowIndex + 2,
    }"
    >{{ row }}</b
  > -->
  <b
    class="cell"
    :class="type"
    v-for="(item, itemIndex) in items"
    :key="`${position}${itemIndex}`"
    >{{ item }}</b
  >
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  position: "top" | "bottom" | "left" | "right";
  items: unknown[];
}>();
const type = computed(() => {
  return ["top", "bottom"].includes(props.position) ? "row" : "column";
});
</script>

<style scoped>
.column {
  border-left: 2px solid black;
  border-right: 2px solid black;
}

.row {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
</style>
