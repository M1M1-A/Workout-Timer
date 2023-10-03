import CountdownTimer from './CountdownTimer'; 

describe('CountdownTimer', () => {
  const mockRounds = [
    { exercise_name: 'Exercise 1', round_duration: 5 },
    { exercise_name: 'Exercise 2', round_duration: 5 },
  ];

  it('should render with initial exercise name and seconds', () => {
    cy.mount(<CountdownTimer rounds={mockRounds} />);
    
    cy.contains('Exercise 1').should('be.visible');
    cy.contains('5').should('be.visible');
  });

  it('should change exercise name and seconds when given multiple rounds', () => {
    cy.mount(<CountdownTimer rounds={mockRounds} />);
    
    cy.wait(6000);

    cy.contains('Exercise 2').should('be.visible');
    cy.contains('5').should('be.visible');
  });

  it('should display "Workout Complete!" when all rounds are finished', () => {
    cy.mount(<CountdownTimer rounds={mockRounds} />);
    
    cy.wait(11000);

    cy.contains('Workout Complete!').should('be.visible');
  });
});
