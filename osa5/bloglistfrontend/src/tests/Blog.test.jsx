import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'Renders component',
    author: 'Mr. Render',
    url: 'http://example.com',
    likes: 3
  }
  render(<Blog blog={blog} />)
  const titleElement = screen.queryByText('Renders component')
  expect(titleElement).toBeDefined()
  const urlElement = screen.queryByText('http://example.com')
  expect(urlElement).toBeNull()
})