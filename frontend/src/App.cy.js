import App from "./App"

describe("App", () => {
  it("loads the component", () => {
    cy.mount(<App />)

    cy.get('h1').should('contain.text', 'Workout Interval Timer')
  })
})

// If no rounds we get "No rounds message"
// Adding a round
// Adding more than one round 
// Editing round
// Deleting all rounds

// Start workout starts the countdown timer and we 
// the name of each workout as it goes through them
