// cypress/integration/cart.spec.js

describe("Update item in cart", () => {
  it("should update item in cart successfully", () => {
    const updatedItem = {
      images: "",
      title: "Updated Title",
      description: "Updated Description",
      price: 150,
      qty: 2,
      categories: "Updated Category",
    };

    cy.request({
      method: "PUT",
      url: "http://localhost:8082/cart/661f64bcf880358302a96365",
      body: updatedItem,
    }).then((response) => {
      // Verify response status code
      expect(response.status).to.eq(200);
    });
  });
});
