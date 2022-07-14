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
  background-color: whitesmoke;
  color: black;
}

.dark {
  background-color: darkblue;
  color: white;
}
</style>
