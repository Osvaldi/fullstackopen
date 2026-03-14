import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

//https://medium.com/@anjaliajith/findbytext-vs-getbytext-vs-querybytext-react-testing-library-9514f5db9d09

describe('Blog tests', () => {
  const blog = {
    title: 'Renders component',
    author: 'Mr. Render',
    url: 'http://example.com',
    likes: '3',
    user: {
      name: 'Test name',
      username: 'Test username'
    }
  }

  beforeEach(() => {
    render(<Blog name={blog.user.name} blog={blog}/>)
  })

  test('renders content', () => {
    expect(screen.queryByText(`${blog.title} ${blog.author}`)).toBeInTheDocument()
    expect(screen.queryByText(`${blog.url}`)).not.toBeInTheDocument()
    expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument()
  })

  test('clicking the view button shows whole blog content', async () => {
    const user = userEvent.setup()
    const button = screen.queryByText('view')
    await user.click(button)
    console.log(screen.debug())
    expect(screen.getByText(`${blog.title}`, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(`${blog.author}`, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(`${blog.url}`, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(`likes ${blog.likes}`, { exact: false })).toBeInTheDocument()

  })
})