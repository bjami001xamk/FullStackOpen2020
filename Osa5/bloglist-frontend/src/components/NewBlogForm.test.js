import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from '../components/NewBlogForm'

const addBlog = jest.fn()
let component


beforeEach(() => {
  component = render(<NewBlogForm createBlog={addBlog} />)
})

test('when you create new blog you call the function with corrent parameters', async() => {
  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('#authorInput')
  const urlInput = component.container.querySelector('#urlInput')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testiTitle' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'testiAuthori' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'testiUrl' }
  })
  fireEvent.submit(form)
  console.log(addBlog.mock.calls[0][0])
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testiTitle')
  expect(addBlog.mock.calls[0][0].author).toBe('testiAuthori')
  expect(addBlog.mock.calls[0][0].url).toBe('testiUrl')
})
