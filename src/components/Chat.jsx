import React, { useState, useContext, useEffect } from 'react';
import { fireBaseApp } from '../firebase';
import { UserContext } from '../context/UserContext';
import { users } from '../data';

const Chat = _ => {
  const [messages, setMessages] = useState({});
  const [messageBody, setMessageBody] = useState(String());
  const [activeUser, setActiveUser] = useState(users[0].display);
  const [user] = useContext(UserContext);

  const handleSubscription = snapshot => {
    const messages = snapshot.val() || {};
    setMessages(messages);
  };
  const subscribeToMessages = user => {
    const ref = fireBaseApp.database().ref(`/messages/${user}`);
    ref.on('value', handleSubscription);
    return _ => ref.off('value', handleSubscription);
  };

  const getMessages = _ => Object.values(messages);

  const handleInputChange = e => setMessageBody(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const messageRef =
      fireBaseApp
        .database()
        .ref(`/messages/${activeUser}`)
        .push() || {};
    const message = { body: messageBody, sender: user.email, id: messageRef.key };
    messageRef.set(message);
    setMessageBody(String());
  };

  useEffect(
    _ => {
      subscribeToMessages(activeUser);
    },
    [activeUser]
  );

  return (
    <div>
      <h1>Firebase Chat Example! - Chatting with {activeUser}</h1>
      <div>
        <h2>Users</h2>
        {users.map(({ id, display }) => (
          <div onClick={_ => setActiveUser(display)}>{display}</div>
        ))}
      </div>
      <div>
        <h2>Messages</h2>
        {getMessages().map(msg => (
          <div key={msg.id}>
            {msg.body} - {msg.sender}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={messageBody} onChange={handleInputChange} />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Chat;
