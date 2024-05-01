// cypress/integration/cart.spec.js

describe("Add item to cart", () => {
  it("should add item to cart successfully", () => {
    // Define the request body
    const requestBody = {
      images: "",
      title: "sccthuscscm",
      description: "banddvdvdva@gmail.com",
      price: 123,
      qty: 1,
      categories: "Clothes",
    };

    // Send a POST request to add item to cart
    cy.request({
      method: "POST",
      url: "http://localhost:8082/api/cart",
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
