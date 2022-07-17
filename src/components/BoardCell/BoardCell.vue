<script setup lang="ts">
// import { reactive, ref } from "vue";
import PopoutMenu from "@/components/PopoutMenu/PopoutMenu.vue";
defineProps<{
  background: "light" | "dark";
  position: string;
  possibleMoves: []; //if replaying a game, you don't need to know where to go next
}>();

function handleMove(event: Event) {
  console.log("handleMove", event.target);
}
</script>

<template>
  <b :data-testid="position" class="cell" :class="background">
    <div class="menu-popup" :style="{ position: 'relative' }">
      <template v-if="possibleMoves">
        <PopoutMenu :list="possibleMoves" :label="position" />
      </template>
    </div>
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
