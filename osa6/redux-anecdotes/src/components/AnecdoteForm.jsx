import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote= await anecdoteService.createNew(anecdote)
        dispatch(addAnecdote(newAnecdote))
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