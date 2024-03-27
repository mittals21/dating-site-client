import React, { useContext } from 'react';
import { MainContext } from './MainContext';

function Message({ message }) {
  const { user } = useContext(MainContext);

  const dateString =
    new Date(message.time).toLocaleDateString() + ' ' + new Date(message.time).toLocaleTimeString();
  return (
    <div
      className={
        message.sendingUser === user.username ? 'message message__own' : 'message message__others'
      }
    >
      <div className='message__top'>
        <div className='message__author'>{message.sendingUser}</div>
        <div className='message__time'>{dateString}</div>
      </div>
      <div className='message__text'>{message.text}</div>
    </div>
  );
}

export default Message;
