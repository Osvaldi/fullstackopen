import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'


const Notification = () => {
  const notificationMessage = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notificationMessage) {
      const timeoutID = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)

      return () => clearTimeout(timeoutID)
    }
  }, [notificationMessage, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={style}> {notificationMessage} </div>
}

export default Notification
