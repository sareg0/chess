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
  type Move,
} from "chess.js";
// https://github.com/jhlywa/chess.js/blob/master/README.md#example-code

export function newGame() {
  return new Chess();
}

export function move(
  game: ChessInstance,
  move: ShortMove
): (Move | null) | "game over" {
  console.log("move", move);
  const isGameOver = game.game_over();
  if (isGameOver) {
    return "game over";
  }

  return game.move(move);
}

export function currentPlayer(game: ChessInstance) {
  return game.turn();
}

export function currentBoard(game: ChessInstance): (BoardSquare | null)[][] {
  return game.board();
}

export function isMove(move: Move): move is Move {
  return (move as Move).color !== undefined;
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
