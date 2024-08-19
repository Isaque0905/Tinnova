const API_KEY = Cypress.env('TRELLO_API_KEY');
const TOKEN = Cypress.env('TRELLO_TOKEN');

describe('Trello API - Delete Card', () => {
  let cardId;
  let listId;

  before(() => {
    // Cria um board temporário
    cy.request({
      method: 'POST',
      url: `/boards/?name=Temp Board&key=${API_KEY}&token=${TOKEN}`,
    }).then((response) => {
      const boardId = response.body.id;

      // Cria uma lista no board
      cy.request({
        method: 'POST',
        url: `/lists?name=Temp List&idBoard=${boardId}&key=${API_KEY}&token=${TOKEN}`,
      }).then((response) => {
        listId = response.body.id;

        // Cria um card na lista
        cy.request({
          method: 'POST',
          url: `/cards?name=Card To Delete&idList=${listId}&key=${API_KEY}&token=${TOKEN}`,
        }).then((response) => {
          cardId = response.body.id;
        });
      });
    });
  });

  it('should delete the card', () => {
    cy.request({
      method: 'DELETE',
      url: `/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);  // Verifica se a exclusão foi bem-sucedida
    });

    // Verifica se o card foi realmente excluído
    cy.request({
      method: 'GET',
      url: `/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);  // Verifica se o card não existe mais
    });
  });
});
