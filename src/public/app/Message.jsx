import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
    }
  }
  render() {
    return(
      <div className="message-container" style={{backgroundColor: this.props.backgroundColor}}>
        {this.props.message}
      </div>
    )
  }
}

export default Message;