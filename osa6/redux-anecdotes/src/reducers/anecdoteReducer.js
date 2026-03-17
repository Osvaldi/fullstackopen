import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find(a => a.id === id)
    const changedAnecdote = {...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
    await anecdoteService.updateVote(id, changedAnecdote)
    const anecdotes =  getState().anecdotes.map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
