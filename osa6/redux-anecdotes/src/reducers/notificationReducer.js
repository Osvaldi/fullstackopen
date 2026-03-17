import { createSlice } from '@reduxjs/toolkit'


let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    stateNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { stateNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(stateNotification(message))
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}
export default notificationSlice.reducer