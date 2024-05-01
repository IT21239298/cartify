describe("ContactUs Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/ContactUs");
  });

  it("should submit the form successfully with valid data", () => {
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('textarea[name="message"]').type("This is a test message");
    cy.get('button[type="submit"]').click();

    cy.contains("Form submitted successfully!").should("be.visible");

    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('textarea[name="message"]').should("have.value", "");
  });

  it("should display validation error messages for invalid data", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Message is required").should("be.visible");

    cy.get('input[name="name"]').should("have.class", "border-red-500");
    cy.get('input[name="email"]').should("have.class", "border-red-500");
    cy.get('textarea[name="message"]').should("have.class", "border-red-500");

    cy.get('input[name="name"]').type("123");
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('textarea[name="message"]').type("a".repeat(251));

    cy.wait(1000);

    cy.get('button[type="submit"]').click();

    cy.contains(
      "Enter a valid name without special characters or numbers"
    ).should("be.visible");
    cy.contains("Enter a valid email address").should("be.visible");

    cy.get('input[name="name"]').should("have.class", "border-red-500");
    cy.get('input[name="email"]').should("have.class", "border-red-500");
  });
});
