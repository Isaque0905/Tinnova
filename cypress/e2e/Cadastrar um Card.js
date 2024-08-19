const API_KEY = Cypress.env('TRELLO_API_KEY');
const TOKEN = Cypress.env('TRELLO_TOKEN');

describe('Trello API - Create Card', () => {
  let boardId;
  let listId;

  before(() => {
    // Cria um board temporário
    cy.request({
      method: 'POST',
      url: `/boards/?name=Temp Board&key=${API_KEY}&token=${TOKEN}`,
    }).then((response) => {
      boardId = response.body.id;

      // Cria uma lista no board
      cy.request({
        method: 'POST',
        url: `/lists?name=Temp List&idBoard=${boardId}&key=${API_KEY}&token=${TOKEN}`,
      }).then((response) => {
        listId = response.body.id;
      });
    });
  });

  it('should create a new card', () => {
    const cardName = 'New Card';
    cy.request({
      method: 'POST',
      url: `/cards?name=${cardName}&idList=${listId}&key=${API_KEY}&token=${TOKEN}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(cardName);
      cy.wrap(response.body.id).as('cardId');
    });
  });
});
