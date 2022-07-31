<script setup lang="ts">
import type { BoardSquare } from "@/api/GameLogic";
import { Pieces } from "@/api/GameLogic";

defineProps<{
  background: "light" | "dark";
  // position will be the return type of the board
  position?: BoardSquare | null;
  selected?: boolean | undefined;
}>();
</script>

<template>
  <b class="cell" :class="[background, { 'is-selected': selected }]">
    <template v-if="position">
      <!-- {{ position.type }}-{{ position.color }} -->
      <span :class="position.color" :data-testid="position.square">
        {{ Pieces[position.type].emoji }}
      </span>
    </template>
  </b>
</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0px 1px 1px black;
  font-size: 1.75rem;
  height: 1.75em;
  width: 1.75em;
}

.is-selected {
  border: 2px solid red;
}

.light {
  background-color: lightgray;
}

.dark {
  background-color: gray;
}

.b {
  color: black;
  font-weight: bolder;
  text-shadow: 0px 0px 1px white;
}
.w {
  color: white;
  font-weight: bolder;
  text-shadow: 0px 1px 1px black;
}
</style>
