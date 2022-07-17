import { mount } from "cypress/vue";
import PopoutMenu from "../PopoutMenu.vue";
describe("PopoutMenu.cy.ts", () => {
  it("should not show the list straight away", () => {
    // when I had the wrong prop here, it didn't warn me
    // how can I fix that and get a warning that the prop is wrong?
    mount(PopoutMenu, {
      props: { label: "unique", list: ["one", "two", "three"] },
    });
    cy.get("[aria-label=unique]")
      .should("be.visible")
      .and("contain.text", "unique");
    cy.get("[aria-label=menu]").should("not.be.visible");
  });
  it("should show the list after clicking the menu", () => {
    mount(PopoutMenu, {
      props: { label: "unique", list: ["one", "two", "three"] },
    });
    cy.get("[aria-label=unique]").click();
    cy.get("[aria-label=menu]").should("be.visible");
    cy.get("[role=menuitem]").should("be.visible");
  });
});
