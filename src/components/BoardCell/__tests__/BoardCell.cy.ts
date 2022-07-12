import { mount } from "cypress/vue";
import BoardCell from "../BoardCell.vue";
describe("BoardCell.cy.ts", () => {
  it("should render", () => {
    mount(BoardCell, { props: { position: "S3", background: "light" } });
    cy.get("[data-testid=S3]").should("be.visible").and("contain.text", "S3");
  });
});
