describe("App", () => {
  beforeEach(() => {
    cy.visit('/')
  })

  afterEach(() => {
    cy.wait(2000)
    cy.get('#reset-button').should('be.visible').click();
  })

  it("Adds one round and displays its details", () => {
    cy.get('#exercise_name').type("Squats")
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.get('p').should('contain.text', 'Squats')
  })

  it("successfully adds more than one rounds and display details", () => {
    cy.get('#exercise_name').type("Squats")
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.get('#exercise_name').type("Lunges")
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.get('p').should('contain.text', 'Lunges')
  })

  it("Adds one round and start workout shows countdown", () => {
    cy.get('#exercise_name').type("Squats")
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.wait(2000)

    cy.get('#start-workout').click()

    cy.contains('Squats').should('be.visible');
    cy.contains('5').should('be.visible');

  })

  it("Adds more than one round and starting workout shows countdown", () => {
    cy.get('#exercise_name').type("Squats")
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.get('#exercise_name').type("Lunges")
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.get('#start-workout').click()

    cy.wait(5000)

    cy.contains('Lunges').should('be.visible');
    cy.contains('5').should('be.visible');

  })

  it("Clears all round information and resets the page when reset is clicked", () => {
    cy.get('#exercise_name').type("Squats")
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.wait(2000)

    cy.get('#reset-button').click()
    cy.contains('No rounds available. Add round to get started').should('be.visible')
  })

  it("shows an error message if exercise name is blank", () => {
    cy.get('#round_duration').type(5)
    cy.get('#add_round').click()

    cy.wait(2000)

    cy.contains('Exercise name cannot be blank').should('be.visible')
  })

  it("shows an error message if round duration is empty", () => {
    cy.get('#exercise_name').type("Squats")
    cy.get('#add_round').click()

    cy.wait(2000)

    cy.contains('Enter a duration in seconds, e.g 60 or 120').should('be.visible')
  })

})