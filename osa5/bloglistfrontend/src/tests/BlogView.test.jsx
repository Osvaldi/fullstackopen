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


  test('clicking the like button twice calls the event handler twice', async () => {

    const user = userEvent.setup()
    console.log(screen.debug())
    const titleInput = screen.getByPlaceholderText('title...')
    const authorInput = screen.getByPlaceholderText('author...')
    const urlInput = screen.getByPlaceholderText('url...')
    await user.type(titleInput, 'testing a form title...')
    await user.type(authorInput, 'testing a form author...')
    await user.type(urlInput, 'testing a form url...')
    const createButton = screen.queryByText('create')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form title...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing a form author...')
    expect(createBlog.mock.calls[0][0].url).toBe('testing a form url...')
  })
})