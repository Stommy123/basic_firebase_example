import React, { useState, useContext, useEffect, useCallback } from 'react';
import { fireBaseApp } from '../firebase';
import { UserContext } from '../context/UserContext';

const Chat = _ => {
  const [messages, setMessages] = useState({});
  const [messageBody, setMessageBody] = useState(String());
  const [user] = useContext(UserContext);

  const subscribeToMessages = _ => {
    const ref = fireBaseApp.database().ref('/messages');
    ref.on('value', snapshot => {
      const messages = snapshot.val() || {};
      setMessages(messages);
    });
  };

  const getMessages = _ => Object.values(messages);

  const handleInputChange = e => setMessageBody(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const messageRef =
      fireBaseApp
        .database()
        .ref('/messages')
        .push() || {};
    const message = { body: messageBody, sender: user.email, id: messageRef.key };
    messageRef.set(message);
    setMessageBody(String());
  };

  const mountEffect = useCallback(subscribeToMessages, []);

  useEffect(
    _ => {
      mountEffect();
    },
    [mountEffect]
  );

  return (
    <div>
      <h1>Firebase Chat Example!</h1>
      {getMessages().map(msg => (
        <div key={msg.id}>
          {msg.body} - {msg.sender}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={messageBody} onChange={handleInputChange} />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Chat;
