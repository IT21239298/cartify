describe("Shop Component API Test", () => {
  it("fetches product data from API", () => {
    cy.request(`http://localhost:8082/api/seller/get`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  it("handles API call failure", () => {
    cy.request({
      url: `http://localhost:8082/api/invalid_endpoint`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("checks response headers", () => {
    cy.request(`http://localhost:8082/api/seller/get`).then((response) => {
      expect(response.headers).to.include({
        "content-type": "application/json; charset=utf-8",
      });
    });
  });
});
