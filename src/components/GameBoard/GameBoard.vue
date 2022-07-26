<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import BoardCell from "@/components/BoardCell/BoardCell.vue";
import {
  newGame,
  move,
  currentPlayer,
  currentBoard,
} from "../../../api/GameLogic";

const firstPosition = ref(0);
const game = newGame();
const state = reactive({ board: currentBoard(game) });
const player = ref<"white" | "black">(currentPlayer(game));
const cssVars = computed(() => {
  return { "--boardSize": rows.value.length };
});

const rows = computed(() => {
  const rows = [];
  for (const [index] of Array(state.board.length).entries()) {
    rows.push(index + 1);
  }
  return rows;
});

const columns = computed(() => {
  const thingAgain = [];
  for (const [index] of Array(state.board.length).entries()) {
    thingAgain.push(String.fromCharCode(index + 65));
  }
  console.log("columns2", thingAgain);
  return thingAgain;
});

function handleMove() {
  move(game);
  player.value = currentPlayer(game);
  state.board = currentBoard(game);
}

function getPiece(rowIndex: number, columnIndex: number) {
  const position = state.board[rowIndex][columnIndex];
  if (position) {
    return `${position.type}-${position.color}`;
  }
  return "";
}
</script>

<template>
  <h1>{{ player }}</h1>
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
    <template v-for="(row, rowIndex) in rows" :key="row">
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
        :position="`${getPiece(rowIndex, columnIndex)}`"
        :column="columnIndex"
        :style="{
          gridColumnStart: columnIndex + 2,
          gridRowStart: rowIndex + 2,
        }"
        :key="rowIndex + columnIndex"
        data-testid="piece"
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
