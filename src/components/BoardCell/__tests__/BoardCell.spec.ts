import { test, expect } from "vitest";
import { render } from "@testing-library/vue";

import BoardCell from "../BoardCell.vue";

test("BoardCell", async () => {
  // How can I get warned if I am passing the wrong props to the component?
  const { getAllByTestId } = render(BoardCell, {
    props: {
      position: "F1",
      background: "light",
    },
  });
  const cells = getAllByTestId("F1");
  expect(cells).toHaveLength(1);
});
