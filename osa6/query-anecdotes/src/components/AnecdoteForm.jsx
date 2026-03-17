import { useContext } from 'react'
import { useMutation,  useQueryClient } from '@tanstack/react-query'
import {  createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationContext = useContext(NotificationContext)

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationContext.notificationDispatch({type: 'SET_NOTIFICATION', payload: `anecdote '${createdAnecdote.content}' created`})
    },
    onError: (error) => {
      notificationContext.notificationDispatch({type: 'SET_NOTIFICATION', payload: error.message})
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, id: getId(), votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
