<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      columns: ["A", "B", "C", "D", "E", "F", "G", "H"],
      rows: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  computed: {
    cssVars() {
      return { "--boardSize": this.rows.length };
    },
    reversedRows() {
      const rowsCopy = [...this.rows];
      return rowsCopy.reverse();
    },
  },
});
</script>

<template>
  <section class="boardAsGrid" data-testid="board" :style="cssVars">
    <!-- row for the letters -->
    <b
      v-for="(column, columnIndex) in columns"
      :key="`top ${columnIndex}`"
      :style="{
        gridColumnStart: columnIndex + 2,
      }"
      class="cell"
      >{{ column }}</b
    >
    <template v-for="(row, rowIndex) in reversedRows" :key="row">
      <!-- row number column -->
      <b
        :style="{
          gridRowStart: rowIndex + 2,
        }"
        class="cell"
        >{{ row }}</b
      >
      <!-- cells for the pieces -->

      <b
        data-testid="positionOnBoard"
        v-for="(column, columnIndex) in columns"
        :key="rowIndex + columnIndex"
        class="cell"
        :class="[(rowIndex + columnIndex) % 2 === 0 ? 'odd' : 'even']"
        :style="{
          gridColumnStart: columnIndex + 2,
          gridRowStart: rowIndex + 2,
        }"
      >
        {{ `${row} ${column}` }}</b
      >
      <!-- another row number column -->
      <b
        class="cell"
        :style="{
          gridRowStart: rowIndex + 2,
        }"
        >{{ row }}</b
      >
    </template>
    <!--another row for the letters -->
    <b
      v-for="(column, columnIndex) in columns"
      class="cell"
      :key="`top ${columnIndex}`"
      :style="{
        gridColumnStart: columnIndex + 2,
      }"
      >{{ column }}</b
    >
  </section>
</template>

<style scoped>
.boardAsGrid {
  display: grid;
  grid-template-columns: repeat(var(--boardSize) + 2, 1fr);
  grid-template-rows: repeat(var(--boardSize) + 2, 1fr);
  grid-gap: 1px;
  width: 400px;
  height: 400px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.odd {
  background-color: paleturquoise;
}

.even {
  background-color: palevioletred;
}

.piece {
  background-color: rgb(226, 209, 244);
  border: 2px solid black;
}
</style>

<!-- Should it be a table, or a grid? -->
<!-- How do we code the board semantics, if it's a grid? -->
<!-- Aria labels? -->
<!-- Next Idea to try: Board as a table -->
<!-- What's the trade off? -->
