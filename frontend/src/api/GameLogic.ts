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
  const myGame = new Chess();
  console.log("fen", myGame.fen());
  saveGame(myGame.fen());
  return myGame;
}

async function saveGame(fenString: string) {
  const response = await fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      foo: "bar",
      game: fenString,
    }),
  });

  const { data, errors } = await response.json();

  console.log("data", data);
  console.log("errors", errors);

  // .then((response) => {
  //   console.log('response:!!!!', response)
  // }).catch((e) => {
  //   console.log('error!!!!', e);

  // })
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
