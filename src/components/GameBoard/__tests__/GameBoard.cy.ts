import { mount } from "cypress/vue";
import GameBoard from "../GameBoard.vue";
const moveButton = "[data-testid=moveButton]";
const piece = "[data-testid=piece]";
describe("GameBoard.cy.ts", () => {
  it("makes a move", () => {
    mount(GameBoard);
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
