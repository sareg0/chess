import { mount } from "cypress/vue";
import GameBoard from "../GameBoard.vue";
const moveButton = "[data-testid=moveButton]";
const piece = "[data-testid=piece]";
const board = "[data-testid=board]";
describe("GameBoard.cy.ts", () => {
  it("renders a board with the correct pieces", () => {
    mount(GameBoard);
    cy.get(board).should("be.visible");
    // board should have 'piece'
    cy.get(piece).should("be.visible");
  });
});
