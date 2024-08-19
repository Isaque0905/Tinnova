const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      config.env.TRELLO_API_KEY = process.env.TRELLO_API_KEY;
      config.env.TRELLO_TOKEN = process.env.TRELLO_TOKEN;
      return config;
    },
    specPattern: 'cypress/e2e/**/*.js',
  },
});
