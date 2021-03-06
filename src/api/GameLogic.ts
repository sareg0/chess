import {
  Chess,
  type ChessInstance,
  type PieceType,
  type ShortMove,
  type Square,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
} from "chess.js";
// https://github.com/jhlywa/chess.js/blob/master/README.md#example-code

export function newGame() {
  return new Chess();
}

export function move(game: ChessInstance, move: ShortMove) {
  console.log("move", move);
  if (!game.game_over()) {
    return game.move(move);
  }
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

export enum Color {
  "w" = "white",
  "b" = "black",
}

export const Pieces = {
  [PAWN]: {
    emoji: "♙",
  },
  [KNIGHT]: {
    emoji: "♘",
  },
  [BISHOP]: {
    emoji: "♗",
  },
  [ROOK]: {
    emoji: "♖",
  },
  [QUEEN]: {
    emoji: "♕",
  },
  [KING]: {
    emoji: "♔",
  },
};
