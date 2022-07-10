import { mount } from "cypress/vue";
import GameBoard from "../GameBoard.vue";
describe("GameBoard.cy.ts", () => {
  it("playground", () => {
    mount(GameBoard);
  });
});
