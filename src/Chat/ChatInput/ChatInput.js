import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  sendMessage() {
    this.props.onSendMessage(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  }

  handleEnterKey(e) {
    if (e.nativeEvent.keyCode === 13) {
      this.sendMessage();
    }
  }

  render() {
    const { inputValue } = this.state;
    return (
      <footer className="ChatInput">
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputValue.bind(this)}
          onKeyPress={this.handleEnterKey.bind(this)}
        />
        <button type="button" onClick={() => this.sendMessage()}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
