<script lang="ts">
import { defineComponent } from "vue";
import BoardCell from "@/components/BoardCell/BoardCell.vue";

export default defineComponent({
  data() {
    return {
      columns: ["A", "B", "C", "D", "E", "F", "G", "H"],
      rows: [1, 2, 3, 4, 5, 6, 7, 8],
      firstPosition: 0,
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
  methods: {
    handleMove() {
      console.log("move");
      // pick a random spot on the board
      if (this.firstPosition === 0) {
        this.firstPosition = 5;
      } else {
        this.firstPosition = 0;
      }
      console.log("position", this.firstPosition);
    },
  },
  components: { BoardCell },
});
</script>

<template>
  <button @click="handleMove" data-testid="moveButton">make a move</button>
  <section class="boardAsGrid" data-testid="board" :style="cssVars">
    <!-- row for the letters -->
    <b
      class="cell letter-row"
      v-for="(column, columnIndex) in columns"
      :key="`top ${columnIndex}`"
      :style="{
        gridColumnStart: columnIndex + 2,
      }"
      >{{ column }}</b
    >
    <template v-for="(row, rowIndex) in reversedRows" :key="row">
      <!-- number column -->
      <b
        class="cell number-column"
        :style="{
          gridRowStart: rowIndex + 2,
        }"
        >{{ row }}</b
      >
      <!-- cells for the pieces -->
      <BoardCell
        v-for="(column, columnIndex) in columns"
        :background="(rowIndex + columnIndex) % 2 === 0 ? 'light' : 'dark'"
        :position="
          firstPosition === rowIndex && firstPosition === columnIndex
            ? `piece${firstPosition}`
            : `${row}${column}`
        "
        :column="columnIndex"
        :style="{
          gridColumnStart: columnIndex + 2,
          gridRowStart: rowIndex + 2,
        }"
        :key="rowIndex + columnIndex"
        :data-testid="
          firstPosition === rowIndex && firstPosition === columnIndex
            ? 'piece'
            : 'positionOnBoard'
        "
      >
      </BoardCell>
      <!-- number column -->
      <b
        class="cell number-column"
        :style="{
          gridRowStart: rowIndex + 2,
        }"
        >{{ row }}</b
      >
    </template>
    <!--another row for the letters -->
    <b
      class="cell letter-row"
      v-for="(column, columnIndex) in columns"
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

.number-column {
  border-left: 2px solid black;
  border-right: 2px solid black;
}
.letter-row {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
</style>

<!-- Should it be a table, or a grid? -->
<!-- How do we code the board semantics, if it's a grid? -->
<!-- Aria labels? -->
<!-- Next Idea to try: Board as a table -->
<!-- What's the trade off? -->
