import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const styleHidden = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display:'none'
  }
  const styleVisible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display:''
  }
  return (
    <div style={notification === '' ? styleHidden : styleVisible} id='notificationWindows'>
      {notification[0]}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)


export default ConnectedNotification