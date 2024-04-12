describe('Search', () => {
  it('searches based on query then navigates to selected show', () => {
    cy.visit('/')
    
    cy.get('.search-field-container > input')
      .type('girls')
    cy.get('.search-result-item')
      .first()
      .click()

    cy.url()
      .should('contain', '/shows/')
  })
})
