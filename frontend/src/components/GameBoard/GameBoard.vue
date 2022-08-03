<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import BoardCell from "@/components/BoardCell/BoardCell.vue";
import {
  newGame,
  move,
  currentPlayer,
  currentBoard,
  Color,
  type BoardSquare,
  isMove,
} from "@/api/GameLogic";
import { SQUARES, type ShortMove, type Square } from "chess.js";
// import BoardFrame from "@/components/GameBoard/components/BoardFrame/BoardFrame.vue";

const game = newGame();
const state = reactive({ board: currentBoard(game) });
const boardSize = currentBoard(game).length;
const player = ref<keyof typeof Color>(currentPlayer(game));
const cssVars = computed(() => {
  return { "--boardSize": rows.value.length };
});
const selectedPiece = ref<ShortMove["from"] | null>();
const desiredPlace = ref<ShortMove["to"] | null>();

// Trying to create a calculated board. I can drop this for the sake of making more progress
// const gridAreas = computed(() => {
//   const areas = `'. ${columns.value.map(() => "LETTER").join(" ")} .'
//   '${rows.value.map(() => "NUMBER BOARD NUMBER").join(" ")}'
//   '. ${columns.value.map(() => "LETTER").join(" ")} .'`;
//   console.log("gridAreas", areas);
//   return areas;
// });

const rows = computed(() => {
  const rows = [];
  for (const [index] of Array(boardSize).entries()) {
    rows.push(index + 1);
  }
  return rows.reverse();
});

// type return?
const columns = computed(() => {
  const columns = [];
  for (const [index] of Array(boardSize).entries()) {
    columns.push(String.fromCharCode(index + 65));
  }
  return columns;
});

function getPiece(rowIndex: number, columnIndex: number): BoardSquare | null {
  const position = state.board[rowIndex][columnIndex];

  return position;
}

function isASquare(value: string): value is Square {
  // The type of Square and SQUARES is pretty hard to get
  // around.
  // SQUARES needs to be cast as an array of strings
  // to be able to check that the value is included. Much confusing.🤷🏻‍♀️
  const squares = [...SQUARES] as string[];
  return squares.includes(value);
}

function sanString(row: number, column: string) {
  return `${column}${row}`.toLowerCase();
}

function handleSelect(row: number, column: string) {
  const woah = sanString(row, column);
  if (isASquare(woah)) {
    if (selectedPiece.value) {
      desiredPlace.value = woah;
      handleMove();
    } else {
      selectedPiece.value = woah;
    }
  }
}

function handleMove() {
  if (selectedPiece.value && desiredPlace.value) {
    const thing = move(game, {
      from: selectedPiece.value,
      to: desiredPlace.value,
    });
    // if thing is 'game over', then the game is over
    // if null then the move couldn't be made
    // if Move object then make the move
    if (thing === "game over") {
      alert("game over");
    } else if (thing === null) {
      alert("could not make that move");
    } else if (isMove(thing)) {
      if (thing?.captured) {
        alert(`successfully captured: ${thing.captured}`);
      }
    } else {
      throw Error("unknown values!!!!");
    }
    selectedPiece.value = null;
    desiredPlace.value = null;
  }
  player.value = currentPlayer(game);
  state.board = currentBoard(game);
}

function isSelected(row: number, column: string): boolean {
  return selectedPiece.value === sanString(row, column);
}

// function isDisabled(rowIndex: number, columnIndex: number): boolean {
//   const piece = getPiece(rowIndex, columnIndex);
//   if (piece) {
//     return piece.color !== player.value;
//   }
//   return true;
// }
</script>

<template>
  <!-- https://bobbyhadz.com/blog/typescript-const-enum-member-can-only-be-accessed-using-string-literal - thankyou -->
  <div>
    <h1>{{ Color[player] }}</h1>
    <h2>{{ selectedPiece || "no piece selected" }}</h2>
  </div>
  <!-- <button @click="handleMove()" data-testid="moveButton">make a move</button> -->
  <section class="boardAsGrid" data-testid="board" :style="{ ...cssVars }">
    <!-- row for the letters -->
    <!-- Tring to extract a component to avoid repetition -->
    <!-- <span
      :style="{
        gridColumnStart: 2,
        display: 'grid',
      }"
    >
      <BoardFrame :items="columns" position="top" />
    </span> -->
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
      <button
        v-for="(column, columnIndex) in columns"
        :style="{
          gridColumnStart: columnIndex + 2,
          gridRowStart: rowIndex + 2,
          padding: 0,
          borderRadius: 0,
          borderWidth: 0,
        }"
        @click="handleSelect(row, column)"
        :key="rowIndex + columnIndex"
      >
        <BoardCell
          :background="(rowIndex + columnIndex) % 2 === 0 ? 'light' : 'dark'"
          :selected="isSelected(row, column)"
          :position="getPiece(rowIndex, columnIndex)"
          :column="columnIndex"
          data-testid="piece"
        >
        </BoardCell>
      </button>
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
