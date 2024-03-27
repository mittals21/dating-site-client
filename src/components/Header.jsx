import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MainContext } from './MainContext';
import { IoExitOutline } from 'react-icons/io5';
import Loading from './Loading';
import getSecret from '../components/getSecret';

function Header() {
  const { user, setUser, socket } = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  function logoutUser() {
    localStorage.removeItem('secret');
    sessionStorage.removeItem('secret');
    window.location.reload(false);
  }

  async function fetchUser(secret) {
    const resp = await fetch(`http://localhost:4000/api/users/${secret}`);
    const data = await resp.json();
    if (!data.error) {
      setUser(data.user);
      setLoading(false);
      socket.emit('join', secret);
      socket.emit('messages', secret);
    } else {
      nav('/login');
    }
  }

  useEffect(() => {
    const secret = getSecret();
    if (!secret) {
      return nav('/login');
    }
    fetchUser(secret);
  }, []);
  if (loading) return <Loading />;
  return (
    <div>
      <header className='home-header'>
        <div className='home-header__left'></div>
        <div className='home-header__text'>Hello, {user.username}</div>
        <div className='home-header__logout'>
          <div className='btn btn--transparent' onClick={logoutUser}>
            <IoExitOutline className='icon icon--logout' style={{ marginRight: '1rem' }} /> logout
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
