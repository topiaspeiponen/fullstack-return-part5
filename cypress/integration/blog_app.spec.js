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

    const initialBlog = {
        author: 'Make Makea',
        likes: 0,
        title: 'Fullstack mooc kurssin mega suorittaja',
        url: 'www.helsinki.fi'
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

            cy.createBlog(initialBlog.title, initialBlog.author, initialBlog.url)
            cy.reload()
            cy.get('#blog-list').contains(initialBlog.title)
        })
    
        it('A blog can be created', function() {
          cy.get('#toggle-on-btn').click()
          cy.get('#togglable-container').should('have.css', 'display', 'block')

          cy.get('#title').type(blog.title)
          cy.get('#author').type(blog.author)
          cy.get('#url').type(blog.url)
          cy.get('#submit-btn').click()

          cy.get('#blog-list').contains(blog.title)
          cy.get('#blog-list').contains(blog.author)
        })

        it('A blog can be liked', function () {
            cy.get('#blog-list').contains(initialBlog.title).get('#open-btn').click()
            
            cy.get('#blog-open').contains('likes 0')
            cy.get('#blog-open').contains(initialBlog.title).get('#like-btn').click()
            cy.get('#blog-open').contains('likes 1')
            cy.get('#blog-open').contains(initialBlog.title).get('#like-btn').click()
            cy.get('#blog-open').contains('likes 2')
        })
        
        it.only('A blog can be removed by the creator', function() {
            cy.get('#blog-list').contains(initialBlog.title).get('#open-btn').click()
            
            cy.get('#blog-open').get('#remove-btn').click()
            cy.get('#blog-list').contains(initialBlog.title).should('not.exist')
        })
    })
})