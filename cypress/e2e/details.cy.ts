describe('Show Details', () => {
  it('returns not found for non-existent IDs', () => {
    cy.visit('/shows/666666666666')
    
    cy.get('.show-not-found')
      .should('contain', 'Show not found')
  })
})
