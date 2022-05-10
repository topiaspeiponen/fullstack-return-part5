describe('Blog app', function() {
    const user = {
        name: 'Testi testailija',
        username: 'testaaja',
        password: '123'
    }

    const blog = {
        author: 'Testi Testonen',
        likes: 0,
        title: 'Testittömän testin testaaja',
        url: 'www.metropolia.fi'
    }

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.get('#login-form')
	})

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type(user.username)
          cy.get('#password').type(user.password)
          cy.get('#login-submit-btn').click()

          cy.contains('blogs')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type('liibalaaba')
            cy.get('#login-submit-btn').click()
  
            cy.contains('invalid username or password')
        })
      })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-submit-btn').click()
            cy.contains('blogs')
        })
    
        it.only('A blog can be created', function() {
          cy.get('#toggle-on-btn').click()
          cy.get('#togglable-container').should('have.css', 'display', 'block')

          cy.get('#title').type(blog.title)
          cy.get('#author').type(blog.author)
          cy.get('#url').type(blog.url)
          cy.get('#submit-btn').click()

          cy.get('#blog-list').contains(blog.title)
          cy.get('#blog-list').contains(blog.author)
        })
    })
})