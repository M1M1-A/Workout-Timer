import App from "./App"

describe("App", () => {
  it("loads the component and initially there are no rounds", () => {
    cy.mount(<App />)
    cy.get('h1').should('contain.text', 'Workout Interval Timer')
    cy.get('p').should('contain.text', 'No rounds available. Add round to get started')
  })

})
