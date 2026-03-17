import { createContext, useReducer, useEffect } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
 const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    useEffect(() => {
    if (notification) {
      const timeoutID = setTimeout(() => {
        notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timeoutID)
    }
  }, [notification, notificationDispatch])

  return (    
  <NotificationContext.Provider value={{ notification, notificationDispatch }}>
    {props.children}
  </NotificationContext.Provider>
  ) 
}

export default NotificationContext