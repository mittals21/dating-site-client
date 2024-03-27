import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MainContext } from './components/MainContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Unauthorized from './pages/Unauthorized';
import getSecret from './components/getSecret';
import Chat from './pages/Chat';
import Header from './components/Header';

const socket = io.connect('http://localhost:4000');

function App() {
  const [user, setUser] = useState({ username: null, photos: [], likedBy: [] });
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newLike, setNewLike] = useState(null);
  const [newMsg, setNewMsg] = useState({ sendingUser: '' });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [completeUser, setCompleteUser] = useState(false);
  const states = {
    socket,
    user,
    setUser,
    users,
    setUsers,
    filteredUsers,
    setFilteredUsers,
    completeUser,
    setCompleteUser,
    newLike,
    messages,
    setMessages,
    newMsg,
    setNewMsg,
  };

  const nav = useNavigate();

  useEffect(() => {
    if (user.photos.length > 1) {
      setCompleteUser(true);
    }
    socket.emit('users');

    socket.on('newLike', (newLikeId) => {
      setNewLike(newLikeId);
      const updatedArr = [newLikeId, ...user.likedBy];
      setUser({ ...user, likedBy: updatedArr });
    });
  }, [user]);

  useEffect(() => {
    socket.on('newMsg', (msgObj) => {
      setNewMsg(msgObj);
      setMessages([msgObj, ...messages]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on('unauthorized', () => {
      nav('/unauthorized');
    });

    socket.on('user', (user) => {
      setUser(user);
    });

    socket.on('messages', (data) => {
      setMessages(data);
    });

    socket.on('users', (usersData) => {
      const secret = getSecret();
      const usersArr = usersData.filter((x) => x.secret !== secret);
      setUsers(usersArr);
    });
  }, []);

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Header />}>
          <Route index element={<Home />} />
          <Route path='/chat/:otheruser' element={<Chat />} />
        </Route>
        <Route exact path='/unauthorized' element={<Unauthorized />} />
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
