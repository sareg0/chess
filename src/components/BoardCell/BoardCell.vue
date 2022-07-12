<script setup lang="ts">
defineProps<{
  background: "light" | "dark";
  position: string;
}>();
</script>

<template>
  <b :data-testid="position" class="cell" :class="background">
    {{ position }}
  </b>
</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.light {
  background-color: paleturquoise;
}

.dark {
  background-color: palevioletred;
}
</style>
<!-- :style="{
      gridColumnStart: columnIndex + 2,
      gridRowStart: rowIndex + 2,
    }" -->
