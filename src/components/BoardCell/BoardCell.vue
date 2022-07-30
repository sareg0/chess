<script setup lang="ts">
import type { BoardSquare } from "@/api/GameLogic";

defineProps<{
  background: "light" | "dark";
  // position will be the return type of the board
  position?: BoardSquare | null;
}>();
</script>

<template>
  <template v-if="position">
    <b :data-testid="position.square" class="cell" :class="background">
      {{ position.type }}-{{ position.color }}
    </b>
  </template>
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
