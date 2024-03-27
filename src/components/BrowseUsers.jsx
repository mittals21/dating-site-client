import { useContext, useEffect, useState } from 'react';
import DateToAge from './DateToAge';
import { MainContext } from './MainContext';
import PhotoSwiper from './PhotoSwiper';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import getSecret from './getSecret';
import Loading from './Loading';

function BrowseUsers() {
  const { user, filteredUsers, socket } = useContext(MainContext);
  const [userToShow, setUserToShow] = useState({
    username: '',
    photos: [],
    city: '',
    age: '1900-01-01',
  });
  const [showEfect, setShowEfect] = useState(null);

  function handleLike() {
    setShowEfect('like');
    setTimeout(() => {
      const secret = getSecret();
      socket.emit('like', userToShow._id, secret);
      setShowEfect(null);
    }, 1000);
  }

  function handleDislike(params) {
    setShowEfect('dislike');
    setTimeout(() => {
      const secret = getSecret();
      socket.emit('dislike', userToShow._id, secret);
      setShowEfect(null);
    }, 1000);
  }

  useEffect(() => {
    if (filteredUsers.length > 0) {
      const usersArr = filteredUsers.filter((x) => {
        if (user.liked.includes(x._id) || user.disliked.includes(x._id)) {
          return false;
        } else {
          return true;
        }
      });
      if (usersArr.length > 0) {
        setUserToShow(usersArr[usersArr.length - 1]);
      } else {
        setUserToShow({
          username: '',
          photos: [],
          city: '',
          age: '1900-01-01',
        });
      }
    }
  }, [user, filteredUsers]);

  if (filteredUsers.length < 1) return <div className='profile'>No new users to show</div>;

  return (
    <div className='profile heart-backgroud'>
      {userToShow.username === '' ? (
        'No new users to show'
      ) : (
        <>
          <div className='profile__photos'>
            <PhotoSwiper photoArr={userToShow.photos} />

            <div
              className='effect effect__like'
              style={showEfect === 'like' ? { opacity: '0.7' } : {}}
            >
              <AiFillLike />
            </div>

            <div
              className='effect effect__dislike'
              style={showEfect === 'dislike' ? { opacity: '0.7' } : {}}
            >
              <AiFillDislike />
            </div>
          </div>
          <div className='profile__info'>
            <div className='profile__stats'>
              <h4>Name: {userToShow.username}</h4>
              <h4>City: {userToShow.city}</h4>
              <h4>Age: {DateToAge(userToShow.date)}</h4>
              <h4>Photos: {userToShow.photos.length}</h4>
            </div>
            <div className='like'>
              <AiFillLike className='like__icon' onClick={handleLike} />
              <AiFillDislike className='like__icon' onClick={handleDislike} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BrowseUsers;
