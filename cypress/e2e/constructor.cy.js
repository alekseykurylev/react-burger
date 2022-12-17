describe("constructor", function () {
  it("test creating an order", function () {
    cy.visit("http://localhost:3000/react-burger");

    cy.get("[data-testid=60d3b41abdacab0026a733c6]").drag(
      "[data-testid=dropTarget]"
    );
    cy.get("[data-testid=dropTarget]").find(
      "[data-testid=60d3b41abdacab0026a733c6]"
    );

    cy.get("[data-testid=60d3b41abdacab0026a733d2]").drag(
      "[data-testid=dropTarget]"
    );
    cy.get("[data-testid=dropTarget]").find(
      "[data-testid=60d3b41abdacab0026a733d2]"
    );

    cy.get("[data-testid=btn-send-burger]").click();

    const email = "alekseykurylev@yandex.ru";
    const password = "rammstein";

    cy.get("[name=email]").type(`${email}`);
    cy.get("[name=password]").type(`${password}`);

    cy.get("[data-testid=btn-login]").click();

    cy.get("[data-testid=btn-send-burger]").click();

    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders").as(
      "sendBurger"
    );
    cy.wait("@sendBurger");
    cy.get("[data-testid=modal]").get("[data-testid=btn-close]").click();
  });
});
