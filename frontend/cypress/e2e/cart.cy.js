describe("Cart Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/cart");
  });

  it("should display  order summary", () => {
    // Mock the cart items
    cy.intercept("GET", "http://localhost:8082/api/cart/items", {
      fixture: "cartItems.json",
    }).as("getCartItems");
 

    // Check if order summary is displayed
    cy.contains("Order Summary").should("exist");
    cy.contains("Total Qty").should("exist");
    cy.contains("Total Price").should("exist");
  });

  it("should navigate to shop page when 'Back' link is clicked", () => {
    // Click on the 'Back' link
    cy.contains("Back").click();

    // Check if navigation to shop page is successful
    cy.url().should("include", "/shop");
  });

  it("should navigate to checkout page when 'Checkout' button is clicked", () => {
    // Mock the cart items
    cy.intercept("GET", "http://localhost:8082/api/cart/items", {
      fixture: "cartItems.json",
    }).as("getCartItems");

    

    // Click on the 'Checkout' button
    cy.contains("Checkout").click();

    // Check if navigation to checkout page is successful
    cy.url().should("include", "/checkout");
  });
});
