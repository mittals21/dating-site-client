import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from './MainContext';
import { BsEnvelope } from 'react-icons/bs';
import PhotoSwiper from './PhotoSwiper';
import { MdNewReleases } from 'react-icons/md';
import { MdOutlineFiberNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Matches() {
  const [leftTabOn, setLeftTabOn] = useState(true);
  const { user, users, newLike, newMsg } = useContext(MainContext);
  const [likedArr, setLikedArr] = useState([]);
  const [likedByArr, setLikedByArr] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const liked = users.filter((x) => user.liked.includes(x._id));
    const likedby = users.filter((x) => user.likedBy.includes(x._id));
    setLikedArr(liked);
    setLikedByArr(likedby);
  }, [user, users, newLike]);

  return (
    <div>
      <div className='matches__tabs'>
        <label
          htmlFor='regForm'
          className='radio-label matches__tabs--left'
          style={leftTabOn ? { zIndex: 1 } : { zIndex: 0 }}
          onClick={() => setLeftTabOn(true)}
        >
          I Liked
        </label>
        <label
          htmlFor='logForm'
          className='radio-label matches__tabs--right'
          style={leftTabOn ? { zIndex: 0 } : { zIndex: 1 }}
          onClick={() => setLeftTabOn(false)}
        >
          Liked Me
        </label>
      </div>
      <div className='radio-content'>
        <input
          type='radio'
          name='formSelector'
          id='regForm'
          className='radio-toggle'
          defaultChecked
        />
        <div className='radio-body'>
          <div className=' matches__body matches__body--left heart-backgroud'>
            {!!likedArr.length
              ? likedArr.map((x) => (
                  <div key={x.secret} className='matches__photo'>
                    <PhotoSwiper photoArr={x.photos} />
                    <div className='matches__info'>
                      <h4>{x.username}</h4>
                      {user.likedBy.includes(x._id) && (
                        <>
                          <h4>MATCH!</h4>
                          <BsEnvelope
                            style={
                              newMsg.sendingUser === x.username
                                ? { cursor: 'pointer', color: 'red' }
                                : { cursor: 'pointer' }
                            }
                            onClick={() => nav(`/chat/${x.username}`)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))
              : "You don't like no-one, you choosy prick"}
          </div>
        </div>
      </div>
      <div className='radio-content'>
        <input type='radio' name='formSelector' id='logForm' className='radio-toggle' />
        <div className='radio-body'>
          <div className='matches__body matches__body--right heart-backgroud'>
            {!!likedByArr.length
              ? likedByArr.map((x) => (
                  <div key={x.secret} className='matches__photo'>
                    {newLike === x._id && (
                      <div className='matches__new-like'>
                        <MdOutlineFiberNew style={{ color: 'red', fontSize: '8rem' }} />
                      </div>
                    )}
                    <PhotoSwiper photoArr={x.photos} />
                    <div className='matches__info'>
                      <h4>{x.username}</h4>
                      {user.liked.includes(x._id) && (
                        <>
                          <h4>MATCH!</h4>
                          <BsEnvelope
                            style={
                              newMsg.sendingUser === x.username
                                ? { cursor: 'pointer', color: 'red' }
                                : { cursor: 'pointer' }
                            }
                            onClick={() => nav(`/chat/${x.username}`)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))
              : 'Nobody likes you :('}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;
