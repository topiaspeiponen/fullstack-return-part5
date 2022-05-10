describe('Blog app', function() {
    const user = {
        name: 'Testi testailija',
        username: 'testaaja',
        password: '123'
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
})