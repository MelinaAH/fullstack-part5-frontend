describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Testuser',
      username: 'user1',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    //cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Log in to application');
  });

  it('login form is shown', function () {
    cy.contains('login').click();
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click();
      cy.get('#username').type('user1');
      cy.get('#password').type('secret');
      cy.get('#loginButton').click();
  
      cy.contains('Testuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click();
      cy.get('#username').type('user1');
      cy.get('#password').type('wrongRassword');
      cy.get('#loginButton').click();
  
      cy.contains('wrong username or password');
    })
  });

  describe('when user is logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type('user1');
      cy.get('#password').type('secret');
      cy.get('#loginButton').click();
    });

    it('a new blog can be created', function() {
      cy.contains('create a new blog').click();
      
      cy.get('#title').type('a blog title created by cypress');
      cy.get('#author').type('a blog author created by cypress');
      //cy.get('#url').type('http://testurl.com');
      cy.get('#createButton', {force: true}).click();

      cy.contains('create').click();
      cy.contains('a blog title created by cypress');
      cy.contains('a blog author created by cypress');
      //cy.contains('http://testurl.com');
    });
  });
});