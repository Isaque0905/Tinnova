const API_KEY = Cypress.env('TRELLO_API_KEY');
const TOKEN = Cypress.env('TRELLO_TOKEN');

describe('Trello API - Create Board', () => {
  it('should create a new board', () => {
    const boardName = 'New Board';
    cy.request({
      method: 'POST',
      url: `/boards/?name=${boardName}&key=${API_KEY}&token=${TOKEN}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(boardName);
      cy.wrap(response.body.id).as('boardId');
    });
  });
});
