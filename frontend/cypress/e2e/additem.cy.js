import "cypress-file-upload";

describe("AddItem Component", () => {
  beforeEach(() => {
    // Visit the page where AddItem component is rendered
    cy.visit("http://localhost:3000/item");
  });

  it("should successfully add an item", () => {
    cy.intercept("POST", "http://localhost:8082/api/seller/add").as(
      "addItemSuccess"
    );

    // Fill out the form
    cy.fixture("sample-image.jpg").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "sample-image.jpg",
        mimeType: "image/jpg",
      });
    });

    cy.get('input[name="title"]').type("Sample Title");
    cy.get('input[name="description"]').type("Sample Description");
    cy.get('input[name="price"]').type("100");
    cy.get('input[name="quantity"]').type("10");
    // cy.wait(1000); // Add a wait before selecting the option

    // Click on the dropdown to open it
    cy.get(".MuiSelect-select").click();

    // Wait for the dropdown options to appear
    cy.get('[role="option"]').should("be.visible");

    // Click on the desired option
    cy.contains('[role="option"]', "Luuggage & Bags").click();

    cy.get('button[type="submit"]').click();

    // Wait for the first API request to complete
    cy.wait("@addItemSuccess");

    //  success message is shown
    cy.contains("Item added successfully!").should("exist");

    // navigation to selleritem page
    cy.url().should("include", "/selleritem");
  });

  it("should display error message on failed form submission", () => {
    // Stub the API request to fail
    cy.intercept("POST", "http://localhost:8082/api/seller/add", {
      statusCode: 500,
      body: "Error adding item. Please try again.",
    }).as("addItemFailure");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the second API request to complete
    cy.wait("@addItemFailure");

    cy.contains("Error adding item. Please try again.").should("exist");
  });
});
