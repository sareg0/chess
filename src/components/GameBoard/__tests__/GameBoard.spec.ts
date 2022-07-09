import { test } from "vitest";
import { render } from "@testing-library/vue";

import GameBoard from "../GameBoard.vue";

test("GameBoard", async () => {
  // How can I get warned if I am passing the wrong props to the component?
  const { getByText } = render(GameBoard);
  getByText("i am a chess board");
});
