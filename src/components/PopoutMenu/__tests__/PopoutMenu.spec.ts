import { test, expect } from "vitest";
import { render } from "@testing-library/vue";

import PopoutMenu from "../PopoutMenu.vue";
import { fireEvent } from "@testing-library/dom";

test("PopoutMenu", async () => {
  const { getByTestId, getByText } = render(PopoutMenu, {
    props: {
      label: "unique",
      list: ["one", "two", "three"],
    },
  });
  const menu = getByTestId("popupmenu");
  expect(menu).toBeDefined();
  // menu items should not  be visible
  // click
  // menu items should be visible
});
