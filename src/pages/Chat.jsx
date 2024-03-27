import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../components/MainContext';
import Message from '../components/Message';
import getSecret from '../components/getSecret';

function Chat() {
  const [filteredMsg, setFilteredMsg] = useState([]);
  const { otheruser } = useParams();
  const { user, socket, messages, newMsg, setNewMsg } = useContext(MainContext);

  const nav = useNavigate();
  const textRef = useRef();

  function sendMsg() {
    const secret = getSecret();
    const msgObj = {
      sendingUser: user.username,
      receiver: otheruser,
      text: textRef.current.value,
    };
    socket.emit('sendMessage', secret, msgObj);
    textRef.current.value = '';
  }

  useEffect(() => {
    const filteredArr = messages.filter(
      (x) => x.sendingUser === otheruser || x.receiver === otheruser
    );
    setFilteredMsg(filteredArr);
    if (!!filteredArr.find((x) => x._id === newMsg._id)) {
      setNewMsg({ sendingUser: '' });
    }
  }, [messages, otheruser, newMsg]);

  return (
    <div className='chat'>
      <div className='chat__hero'>
        <div className='chat__close' onClick={() => nav('/')}>
          &times;
        </div>
        <div className='chat__area'>
          {filteredMsg
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .map((x) => (
              <Message key={x.time} message={x} />
            ))}
        </div>
        <div className='chat__panel'>
          <textarea
            className='chat__textarea'
            ref={textRef}
            rows='3'
            placeholder='Your message here...'
          ></textarea>
          <button className='btn chat__button' onClick={sendMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
