import App from "./App"

describe("App", () => {
  beforeEach(() => {
    cy.mount(<App />)
  })

  it("loads the component and initially there are no rounds", () => {
    cy.get('h1').should('contain.text', 'Workout Interval Timer')
    cy.get('p').should('contain.text', 'No rounds available. Add round to get started')
  })

  it("allows interaction with input fields", () => {
    cy.get("#exercise_name").type("Push-ups");
    cy.get("#round_duration").type("30");

    cy.wait(2000)
    cy.get("#exercise_name").should("have.value", "Push-ups");
    cy.get("#round_duration").should("have.value", "30");
  });
  
  it("Add Round button adds a round", () => {
    cy.intercept('POST', '/add_round', (req) => {
      req.reply({
        statusCode: 200,
        body: [{round_number: 1,
                exercise_name: "Push-ups",
                round_duration: 30
        }]
      })
    }).as('addRound')

    cy.intercept('GET', '/get_rounds', (req) => {
      req.reply({
        statusCode: 200,
        body: [{round_number: 1,
                exercise_name: "Push-ups",
                round_duration: 30
        }]
      })
    }).as('getRounds')
  
    cy.get("#exercise_name").type("Push-ups");
    cy.get("#round_duration").type("30");
    cy.get("#add_round").click();

    cy.wait("@getRounds").then(() => {
      cy.contains("Push-ups").should('be.visible')
      cy.contains(30).should('be.visible')
    })
  });

  it("Start Workout button starts the workout", () => {
    cy.intercept('POST', '/add_round', (req) => {
      req.reply({
        statusCode: 200,
        body: [{round_number: 1,
                exercise_name: "Push-ups",
                round_duration: 30
        }]
      })
    }).as('addRound')

    cy.intercept('GET', '/get_rounds', (req) => {
      req.reply({
        statusCode: 200,
        body: [{round_number: 1,
                exercise_name: "Push-ups",
                round_duration: 30
        }]
      })
    }).as('getRounds')
  
    cy.get("#exercise_name").type("Push-ups");
    cy.get("#round_duration").type("30");
    cy.get("#add_round").click();

    cy.wait(2000)

    cy.get('#start-workout').click()
    cy.contains("Push-ups").should('be.visible')
  });

  it("Displays error if adding round without exercise name", () =>{
    cy.intercept('POST', '/add_round', (req) => {
      req.reply({
        statusCode: 400,
        body: {message: "Exercise name cannot be blank"
        }
      })
    }).as('addRound')

    cy.get("#round_duration").type("30");
    cy.get("#add_round").click();

    cy.wait("@addRound").then(() => {
      cy.contains("Exercise name cannot be blank").should('be.visible')
    })
  })

  it("Displays error if adding round without round duration", () =>{
    cy.intercept('POST', '/add_round', (req) => {
      req.reply({
        statusCode: 400,
        body: {message: "Round duration cannot be blank"
        }
      })
    }).as('addRound')

    cy.get("#exercise_name").type("Push-ups");
    cy.get("#add_round").click();

    cy.wait("@addRound").then(() => {
      cy.contains("Round duration cannot be blank").should('be.visible')
    })
  })

  it("Displays error if adding round with a round duration which isn't a whole number", () =>{
    cy.intercept('POST', '/add_round', (req) => {
      req.reply({
        statusCode: 400,
        body: {message: "Round duration must be a whole number in seconds, e.g 60 or 120"
        }
      })
    }).as('addRound')

    cy.get("#exercise_name").type("Push-ups");
    cy.get("#round_duration").type("30.5");
    cy.get("#add_round").click();

    cy.wait("@addRound").then(() => {
      cy.contains("Round duration must be a whole number in seconds, e.g 60 or 120").should('be.visible')
    })
  })

  it("Clears all the information when reset clicked", () => {
    cy.intercept('POST', '/add_round', (req) => {
      req.reply({
        statusCode: 200,
        body: [{round_number: 1,
                exercise_name: "Push-ups",
                round_duration: 30
        }]
      })
    }).as('addRound')

    cy.intercept('GET', '/get_rounds', (req) => {
      req.reply({
        statusCode: 200,
        body: [{round_number: 1,
                exercise_name: "Push-ups",
                round_duration: 30
        }]
      })
    }).as('getRounds')

    cy.intercept('DELETE', '/delete_all', (req) => {
      req.reply({
        statusCode: 201,
        body: {message: "All rounds deleted and reset" }
      })
    }).as('deleteRounds')
  
    cy.get("#exercise_name").type("Push-ups");
    cy.get("#round_duration").type("30");
    cy.get("#add_round").click();

    cy.wait('@addRound')
    cy.wait('@getRounds')

    cy.get('#reset-button').click()

    cy.wait("@deleteRounds").then(() => {
      cy.contains('No rounds available. Add round to get started')
      .should('be.visible')
    })
  })
})


