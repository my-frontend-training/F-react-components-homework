import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  sendMessage = (value) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let messages = this.state.messages.concat({
      text: value,
      role: ROLE.CUSTOMER,
      tags: ['CUSTOMER'],
    });

    const replyMessage = answersData.find((answer) =>
      answer.tags.find((tag) => value.includes(tag))
    );
    if (replyMessage) {
      messages = [...messages, replyMessage];
    }
    this.setState({
      messages,
    });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onSendMessage={this.sendMessage} />
      </main>
    );
  }
}

export default Chat;
