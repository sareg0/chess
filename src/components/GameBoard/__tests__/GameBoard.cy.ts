import { mount } from "cypress/vue";
import GameBoard from "../GameBoard.vue";
const moveButton = "[data-testid=moveButton]";
const piece = "[data-testid=piece]";
const board = "[data-testid=board]";
describe("GameBoard.cy.ts", () => {
  it("makes a move", () => {
    mount(GameBoard);
    cy.get(board).should("be.visible");
    // board should have 'piece'
    cy.get(piece).should("have.text", "piece0");
    cy.get(moveButton).click();
    // after clicking the piece should have 'moved'
    cy.get(piece).should("have.text", "piece5");
    cy.get(moveButton).click();
    // after clicking again the piece should have 'moved' back
    cy.get(piece).should("have.text", "piece0");
  });
});
