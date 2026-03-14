import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogView from '../components/BlogsView'

describe('BlogView tests', () => {
  const createBlog = vi.fn()
  const blogs = [

  ]
  beforeEach(() => {
    render(<BlogView blogs={blogs} onCreate={createBlog} />)
  })


  test('clicking the create button calls the event handler and receives the input data', async () => {

    const user = userEvent.setup()
    console.log(screen.debug())
    const titleInput = screen.getByPlaceholderText('title...')
    const authorInput = screen.getByPlaceholderText('author...')
    const urlInput = screen.getByPlaceholderText('url...')
    await user.type(titleInput, 'example title')
    await user.type(authorInput, 'example author')
    await user.type(urlInput, 'http://example.com')
    const createButton = screen.queryByText('create')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('example title')
    expect(createBlog.mock.calls[0][0].author).toBe('example author')
    expect(createBlog.mock.calls[0][0].url).toBe('http://example.com')
  })
})