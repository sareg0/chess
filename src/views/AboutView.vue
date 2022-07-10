<script setup lang="ts">
import GameBoard from "@/components/GameBoard/GameBoard.vue";
</script>

<template>
  <div class="about">
    <GameBoard />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
