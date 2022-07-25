import { Chess, type ChessInstance } from "chess.js";
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
  return game.turn() === "w" ? "white" : "black";
}

export function currentBoard(game: ChessInstance) {
  return game.board();
}
