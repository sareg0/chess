import { test, expect } from "vitest";
import { render } from "@testing-library/vue";

import GameBoard from "../GameBoard.vue";

test("GameBoard", async () => {
  // How can I get warned if I am passing the wrong props to the component?
  const { getAllByTestId } = render(GameBoard);
  // const board = getByTestId("board");
  const spots = getAllByTestId("positionOnBoard");
  expect(spots).toHaveLength(64);
});
