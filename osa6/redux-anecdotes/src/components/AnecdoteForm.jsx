import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(appendAnecdote(anecdote))
        dispatch(setNotification(`Anecdote "${anecdote}" created`))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button>create</button>
            </form>
        </>)
}

export default AnecdoteForm