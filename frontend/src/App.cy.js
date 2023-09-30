import App from "./App"

describe("App", () => {
  beforeEach(() => {
    cy.intercept('/get_rounds', { body: [] }).as('getRounds');
    cy.mount(<App />)

  })

  it("loads the component and initially there are no rounds", () => {
    cy.get('h1').should('contain.text', 'Workout Interval Timer')
    cy.get('p').should('contain.text', 'No rounds available. Add round to get started')
  })

  it("displays the round when a round is added", () => {
    cy.get('#exercise_name').type("Squats");
    cy.get('#round_duration').type(5);
    
    cy.intercept('/add_round', { fixture: 'mockedRoundAdded.json' }).as('addRound');
    cy.intercept('/get_rounds', { fixture: 'mockedRoundAdded.json' }).as('getRounds');
    
    cy.get('#add_round').click();
    
    cy.wait(['@addRound', '@getRounds']);
    
    cy.get('p').should('contain.text', 'Squats');
  });
})

// Adding a round
// Adding more than one round 
// Editing round
// Deleting all rounds

// Start workout starts the countdown timer and we get
// the name of each workout as it goes through them
