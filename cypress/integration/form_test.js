describe("Testing Order Form", function()
{
  beforeEach(function(){
    cy.visit("http://localhost:3000/pizza")
  })
  it("Add Test to inputs and submit form", function()
  {
    cy.get('[for="name"] > input')
    .type("Slim Shady")
    .should("have.value", "Slim Shady")
    
    cy.get('#cheese')
    .check()
    cy.get('#pineapple')
    .check()
    
    cy.get('button')
    .click()
  })
})