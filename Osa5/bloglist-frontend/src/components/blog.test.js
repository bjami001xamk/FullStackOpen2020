import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('testit' , () => {
  let component
  const mockHandler = jest.fn()

  const blog = {
    user: 'gjraiojgre3244324',
    likes: 1,
    author: 'kirjoittaja',
    title: 'esimerkkiTitle',
    url: 'testiUrl'
  }

  const user = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmltaWV0IiwiaWQiOiI1ZWQ0ODg5NGRmNDhlMzI4NzAwZTQyNzkiLCJpYXQiOjE1OTEwOTE3MDl9.WXMt6CVi5ONQ1bHyKJTQ3J13gDbcNlJPS2nFOmWjLK8',
    username: 'janimiet',
    name: 'Jani Miettinen'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} setBlogs={mockHandler} user={user}/>
    )
  })


  test('component renders title and author but not title or likes initially', () => {

    expect(component.container).toHaveTextContent(
      'esimerkkiTitle'
    )
    expect(component.container).toHaveTextContent(
      'kirjoittaja'
    )

    const div = component.container.querySelector('.urlAndLikes')
    expect(div).toHaveStyle('display:none')
  })

  test('You will see likes and and url after button is pressed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)
    const div = component.container.querySelector('.urlAndLikes')
    expect(div).not.toHaveStyle('display:none')
  })

  /*test('if you press like button twice, event handle will be called twice', async() => {
    const serverUrl = '/api/blogs/' + blog.id
    const blogThatIsLeaving = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect( await blogServices.update(blogThatIsLeaving,serverUrl).calls).toHaveLength(2)
  })*/
})