import { mount } from "cypress/vue";
import BoardCell from "../BoardCell.vue";
describe("BoardCell.cy.ts", () => {
  it("should render a light cell", () => {
    mount(BoardCell, { props: { position: "S3", background: "light" } });
    cy.get("[data-testid=S3]").should("be.visible").and("contain.text", "S3");
  });

  it("should render a dark cell", () => {
    mount(BoardCell, { props: { position: "S3", background: "dark" } });
    cy.get("[data-testid=S3]").should("be.visible").and("contain.text", "S3");
  });
});
