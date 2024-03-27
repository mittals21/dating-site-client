import React, { useContext } from 'react';
import { MainContext } from '../components/MainContext';
import { MdNewReleases } from 'react-icons/md';
import {
  BsFillPersonFill,
  BsFilter,
  BsFillPeopleFill,
  BsFillEmojiHeartEyesFill,
  BsEnvelope,
} from 'react-icons/bs';
import UserProfile from '../components/UserProfile';
import BrowseUsers from '../components/BrowseUsers';
import Matches from '../components/Matches';
import Filter from '../components/Filter';

function Home() {
  const { completeUser, newLike, newMsg } = useContext(MainContext);

  return (
    <div className='home-page'>
      <div className='hero'>
        <div className='hero__tab'>
          <input type='checkbox' id='profile' className='checkbox-hack__input' defaultChecked />
          <label htmlFor='profile' className='hero__label checkbox-hack__label'>
            <div className='center-V'>
              <BsFillPersonFill style={{ marginRight: '1rem' }} /> User Profile
            </div>
          </label>
          <div className='checkbox-hack__body'>
            <UserProfile />
          </div>
        </div>
        {completeUser && (
          <>
            <div className='hero__tab'>
              <input type='checkbox' id='filter' className='checkbox-hack__input' />
              <label htmlFor='filter' className='hero__label checkbox-hack__label'>
                <div className='center-V'>
                  <BsFilter style={{ marginRight: '1rem' }} /> Users Filter
                </div>
              </label>
              <div className='checkbox-hack__body'>
                <Filter />
              </div>
            </div>
            <div className='hero__tab'>
              <input type='checkbox' id='likes' className='checkbox-hack__input' />
              <label htmlFor='likes' className='hero__label checkbox-hack__label'>
                <div className='center-V'>
                  <BsFillPeopleFill style={{ marginRight: '1rem' }} /> Browse Users
                </div>
              </label>
              <div className='checkbox-hack__body'>
                <BrowseUsers />
              </div>
            </div>
            <div className='hero__tab'>
              <input type='checkbox' id='history' className='checkbox-hack__input' />
              <label htmlFor='history' className='hero__label checkbox-hack__label'>
                <div className='center-V'>
                  <BsFillEmojiHeartEyesFill style={{ marginRight: '1rem' }} /> Matched Users
                  {newMsg.text && (
                    <BsEnvelope style={{ cursor: 'pointer', color: 'red', marginLeft: '1rem' }} />
                  )}
                  {newLike && <MdNewReleases style={{ color: 'red', marginLeft: '1rem' }} />}
                </div>
              </label>
              <div className='checkbox-hack__body'>
                <Matches />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
