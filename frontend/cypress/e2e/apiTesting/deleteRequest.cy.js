
describe("Remove item from cart", () => {
  it("should remove item from cart successfully", () => {
    
    cy.request({
      method: "DELETE",
      url: "http://localhost:8082/cart/661d813655526b920e95f14d",
    }).then((response) => {
      // Verify response status code
      expect(response.status).to.eq(200); 
    });
  });
});
