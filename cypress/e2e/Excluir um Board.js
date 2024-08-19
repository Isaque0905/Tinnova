const API_KEY = Cypress.env('TRELLO_API_KEY');
const TOKEN = Cypress.env('TRELLO_TOKEN');

describe('Trello API - Delete Board', () => {
  let boardId;

  before(() => {
    cy.request({
      method: 'POST',
      url: `/boards/?name=Board To Delete&key=${API_KEY}&token=${TOKEN}`,
    }).then((response) => {
      boardId = response.body.id;
    });
  });

  it('should delete the board', () => {
    cy.request({
      method: 'DELETE',
      url: `/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
