import {
  Chess,
  type ChessInstance,
  type PieceType,
  type Square,
} from "chess.js";
// https://github.com/jhlywa/chess.js/blob/master/README.md#example-code

export function newGame() {
  return new Chess();
}

export function move(game: ChessInstance) {
  if (!game.game_over()) {
    const moves = game.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.move(move);
  }
  console.log(game.board());
}

export function currentPlayer(game: ChessInstance) {
  return game.turn();
}

export function currentBoard(game: ChessInstance): (BoardSquare | null)[][] {
  return game.board();
}

export interface BoardSquare {
  type: PieceType;
  color: keyof typeof Color;
  square: Square;
}

export const enum Color {
  "w" = "white",
  "b" = "black",
}
