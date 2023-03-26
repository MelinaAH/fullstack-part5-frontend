describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testuser',
      username: 'user1',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Log in to application');
  });

  it('login form is shown', function () {
    cy.contains('login').click();
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('user1');
      cy.get('#password').type('secret');
      cy.get('#loginButton').click();

      cy.contains('Testuser logged in')
    })

    it('fails with wrong credentials', function () {
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

    it('A blog can be created', function () {
      cy.contains('create a new blog').click();

      cy.get('#title').type('a blog title created by cypress');
      cy.get('#author').type('a blog author created by cypress');
      cy.get('#url').type('someurl');
      cy.get('#createButton', { force: true }).click();

      cy.contains('create').click();
      cy.contains('a blog title created by cypress');
      cy.contains('a blog author created by cypress');
    });

    it('A blog can be liked', function () {
      cy.contains('create a new blog').click();

      cy.get('#title').type('Testtitle');
      cy.get('#author').type('Testauthor');
      cy.get('#url').type('someurl');
      cy.get('#createButton').click();

      cy.contains('create').click();
      cy.contains('Testauthor');

      cy.contains('view').click();
      cy.contains('likes').click();

      cy.contains('likes: 1');
    });

    it('The person who has added the blog can also remove it', function () {
      cy.contains('create a new blog').click();

      cy.get('#title').type('Testtitle');
      cy.get('#author').type('Testauthor');
      cy.get('#url').type('someurl');
      cy.get('#createButton').click();

      cy.contains('create').click();

      cy.contains('Testtitle');
      cy.contains('Testauthor');
      cy.contains('view').click();

      cy.contains('remove blog').click();
      cy.contains('Testtitle').should('not.exist');
    });

    describe('when user is logged in as an other user', function () {
      it('only the creator of a blog can remove it', function () {
        cy.contains('create a new blog').click();
        cy.get('#title').type('blog title');
        cy.get('#author').type('blog author');
        cy.get('#url').type('blog url');
        cy.get('#createButton').click();

        cy.contains('blog title blog author').click();
        cy.get('#removeButton').should('not.exist');
      });
    });

    describe('blogs are sorted according to likes', () => {
      it('blogs are sorted so that the one with the most likes is first', () => {
        // the first blog
        cy.contains('create a new blog').click();
        cy.get('#title').type('Blog 1');
        cy.get('#author').type('Author 1');
        cy.get('#url').type('www.blog1.com');
        cy.get('#createButton').click();
  
        // the second blog
        cy.contains('create a new blog').click();
        cy.get('#title').type('Blog 2');
        cy.get('#author').type('Author 2');
        cy.get('#url').type('www.blog2.com');
        cy.get('#createButton').click();
  
        // the third blog
        /*cy.contains('create a new blog').click();
        cy.get('#title').type('Blog 3');
        cy.get('#author').type('Author 3');
        cy.get('#url').type('www.blog3.com');
        cy.get('#createButton').click();*/

        cy.get('.blog').eq(0).contains('button', 'view').click()
        cy.get('.blog').eq(0).contains('button', 'likes').click()
        cy.wait(1000) //wait for likes to update
        cy.get('.blog').eq(0).should('contain', 'Blog 1')
        cy.get('.blog').eq(1).should('contain', 'Blog 2')
      
        cy.get('.blog').eq(1).contains('button', 'view').click()
        cy.get('.blog').eq(1).contains('button', 'likes').click()
        cy.wait(1000) //wait for likes to update
        cy.get('.blog').eq(0).should('contain', 'Blog 1')
        cy.get('.blog').eq(1).should('contain', 'Blog 2')
      })
    });
  });
});