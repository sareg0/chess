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
  //
  <!-- type checking and auto-completion enabled -->
  {{ count.toFixed(2) }}
</template>
