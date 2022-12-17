describe("modal", function () {
  it("open modal ingredient", function () {
    cy.visit("http://localhost:3000/react-burger");

    let title;

    cy.get("[data-testid=60d3b41abdacab0026a733d2]")
      .children("h3")
      .should(($title) => {
        title = $title.text();
      })
      .click();

    cy.get("[data-testid=modal-ingredient]")
      .find("h4")
      .should(($title) => {
        const titleModal = $title.text();
        expect(title).equal(titleModal);
      });
  });
});
