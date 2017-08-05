import React from 'react'
import { connect } from 'react-redux'
import FlashMessage from './FlashMessage'
import PropTypes from 'prop-types'
import { deleteFlashMessage } from '../../actions/flashMessages'

class FlashMessagesList extends React.Component {
  render () {
    const { deleteFlashMessage } = this.props
    const messages = this.props.messages.map(message => 
      <FlashMessage 
        key={message.id}
        message={message}
        deleteFlashMessage={deleteFlashMessage}
      />
    )

    return (
      <div>
        {messages}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList)
