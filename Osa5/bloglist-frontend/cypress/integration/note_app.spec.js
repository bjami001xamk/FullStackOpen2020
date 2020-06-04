describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jani Miettinen',
      username: 'janimiet',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  describe('Login', function(){
    it('login fails with wrong password', function() {
      cy.get('input:first').type('janimiet')
      cy.get('input:last').type('salasanaväärä')
      cy.contains('login').click()
      cy.contains('Wrong username or password')
    })
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('janimiet')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
      cy.contains('Jani Miettinen logged in')
    })
  })
  
  it('Login form is shown', function(){
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  it('front page can be opened' , function() {
    cy.contains('logs')
  })
  

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('janimiet')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
    })
    it('new blog can be created', function(){
      cy.contains('New blog').click()
      cy.get('#titleInput').type('Otsikko1')
      cy.get('#authorInput').type('Authori1')
      cy.get('#urlInput').type('testiUrli1')
      cy.contains('create').click()
      cy.contains('Otsikko1')
      cy.contains('Authori')
    })

    describe('blog test', function() {
      beforeEach(function(){
        cy.contains('New blog').click()
        cy.get('#titleInput').type('Otsikko1')
        cy.get('#authorInput').type('Authori1')
        cy.get('#urlInput').type('testiUrli1')
        cy.contains('create').click()
      })
      it('you can like a blog', function() {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('1')
      })
      it('you can delete the blog', function() {
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.on('window:confirm', () => true);
        cy.contains('Otsikko1').should('not.exist')
      })
      
      it.only('blogs are ordered depending on their likes', function() {
        cy.contains('New blog').click()
        cy.get('#titleInput').clear().type('Otsikko2')
        cy.get('#authorInput').clear().type('Authori2')
        cy.get('#urlInput').clear().type('testiUrli2')
        cy.contains('create').click()
        cy.contains('New blog').click()
        cy.get('#titleInput').clear().type('Otsikko3')
        cy.get('#authorInput').clear().type('Authori3')
        cy.get('#urlInput').clear().type('testiUrli3')
        cy.contains('create').click()
        cy.get('#vOtsikko1').click()
        cy.get('#vOtsikko2').click()
        cy.get('#vOtsikko3').click()
        cy.get('#Otsikko1').click()
        cy.get('#allBlogs div').first().contains('Otsikko1')
        
        cy.get('#Otsikko2').click()
        cy.wait(1000)
        cy.get('#Otsikko3').click()
        cy.wait(1000)
        cy.get('#Otsikko2').click()
        cy.wait(1000)
        cy.get('#allBlogs div').first().contains('Otsikko2')
        cy.wait(1000)
        cy.get('#Otsikko3').click()
        cy.wait(1000)
        cy.get('#Otsikko3').click()
        cy.wait(1000)
        cy.get('#Otsikko3').click()
        cy.get('#allBlogs div').first().contains('Otsikko3')
      })

    })

  })

})