import React, { useContext, useRef, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { MainContext } from '../components/MainContext';

function Login() {
  const [stayLoged, setStayLoged] = useState(false);
  const [serverResp, setServerResp] = useState({
    error: false,
    message: null,
  });
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState('man');
  const [registerOn, setRegisterOn] = useState(true);

  const regName = useRef();
  const regPas1 = useRef();
  const regPas2 = useRef();
  const regCity = useRef();
  const regAge = useRef();
  const logName = useRef();
  const logPass = useRef();

  async function handleRegister(e) {
    e.preventDefault();
    if (regPas1.current.value !== regPas2.current.value)
      return setServerResp({
        error: true,
        message: 'Passwords don\'t match',
      });
    const userObj = {
      username: regName.current.value,
      password: regPas1.current.value,
      gender: gender,
      date: regAge.current.value,
      city: regCity.current.value,
    };
    const resp = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObj),
    });
    const data = await resp.json();
    setServerResp(data);
    regName.current.value = '';
    regPas1.current.value = '';
    regPas2.current.value = '';
    regCity.current.value = '';
    regAge.current.value = '';
  }

  const nav = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const resp = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: logName.current.value,
        password: logPass.current.value,
      }),
    });
    const data = await resp.json();
    if (data.error) {
      setServerResp(data);
    } else {
      if (stayLoged) {
        localStorage.setItem('secret', data.secret);
      } else {
        sessionStorage.setItem('secret', data.secret);
      }
      nav('/');
    }
  }

  return (
    <div className='page-container'>
      <div className='bg-video'>
        <video
          className='bg-video__content'
          autoPlay
          muted
          loop
          onCanPlay={() => setLoading(false)}
        >
          <source src={'http://localhost:4000/images/video.mp4'} type='video/mp4' />
          Your browser is not supported to play this video!
        </video>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='login'>
          <h1 className='login__heading'>Senior Tinder</h1>
          <div className='login__hero'>
            <h2 className='login__sub-heading'>Dating app for senior people</h2>
            <div className='login__tabs'>
              <label
                htmlFor='regForm'
                className='radio-label radio-label login__tabs--left'
                style={registerOn ? { zIndex: 1 } : { zIndex: 0 }}
                onClick={() => setRegisterOn(true)}
              >
                Register
              </label>
              <label
                htmlFor='logForm'
                className='radio-label radio-label login__tabs--right'
                style={registerOn ? { zIndex: 0 } : { zIndex: 1 }}
                onClick={() => setRegisterOn(false)}
              >
                Log In
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
              <div className='radio-body login__body--left'>
                <form className='login-form' onSubmit={handleRegister}>
                  <h4 className='login-form__disclaimer login-form__disclaimer--blue'>
                    *All fields required!
                  </h4>
                  <div className='login-form__group'>
                    <input
                      type='text'
                      id='regName'
                      className='login-form__input'
                      placeholder='User name'
                      ref={regName}
                    />
                    <label htmlFor='regName' className='login-form__label'>
                      User name
                    </label>
                  </div>
                  <div className='login-form__group'>
                    <input
                      type='text'
                      id='regPas1'
                      className='login-form__input'
                      placeholder='Password'
                      ref={regPas1}
                    />
                    <label htmlFor='regPas1' className='login-form__label'>
                      Password
                    </label>
                  </div>
                  <div className='login-form__group'>
                    <input
                      type='text'
                      id='regPas2'
                      className='login-form__input'
                      placeholder='Repeat Password'
                      ref={regPas2}
                    />
                    <label htmlFor='regPas2' className='login-form__label'>
                      Repeat Password
                    </label>
                  </div>
                  <div className='login-form__group'>
                    <input
                      type='text'
                      id='regCity'
                      className='login-form__input'
                      placeholder='City'
                      ref={regCity}
                    />
                    <label htmlFor='regCity' className='login-form__label'>
                      City
                    </label>
                  </div>
                  <div className='login-form__group'>
                    <input
                      type='date'
                      id='regAge'
                      className='login-form__input'
                      placeholder='Birth Date'
                      ref={regAge}
                    />
                    <label htmlFor='regAge' className='login-form__label'>
                      Birth Date
                    </label>
                  </div>
                  <div className='login-form__gender-group'>
                    <div className='container'>
                      <input
                        type='radio'
                        id='male'
                        defaultChecked
                        name='genderRadio'
                        className='radio-toggle'
                        value='man'
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className='gender-label' htmlFor='male'>
                        Man
                      </label>
                    </div>
                    <div className='container'>
                      <input
                        type='radio'
                        id='female'
                        name='genderRadio'
                        className='radio-toggle'
                        value='woman'
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className='gender-label' htmlFor='female'>
                        Woman
                      </label>
                    </div>
                  </div>
                  <button className='btn btn--blue'>SUBMIT</button>
                </form>
              </div>
            </div>
            <div className='radio-content'>
              <input type='radio' name='formSelector' id='logForm' className='radio-toggle' />
              <div className='radio-body login__body--right'>
                <form className='login-form' onSubmit={handleLogin}>
                  <div className='div'>
                    <div className='login-form__group'>
                      <input
                        type='text'
                        id='regName'
                        className='login-form__input'
                        placeholder='User name'
                        ref={logName}
                      />
                      <label
                        htmlFor='regName'
                        className='login-form__label login-form__label--light'
                      >
                        User name
                      </label>
                    </div>
                    <div className='login-form__group'>
                      <input
                        type='text'
                        id='regPas1'
                        className='login-form__input'
                        placeholder='Password'
                        ref={logPass}
                      />
                      <label
                        htmlFor='regPas1'
                        className='login-form__label login-form__label--light '
                      >
                        Password
                      </label>
                    </div>
                    <div className='login-form__group'>
                      <input
                        type='checkbox'
                        className='login-form__stayLoged'
                        id='staylogedin'
                        checked={stayLoged}
                        onChange={() => setStayLoged(!stayLoged)}
                      />
                      <label
                        style={{ display: 'inline-block' }}
                        htmlFor='staylogedin'
                        className='login-form__label login-form__label--light '
                      >
                        Stay Logged In
                      </label>
                    </div>
                  </div>
                  <button className='btn btn--light'>SUBMIT</button>
                </form>
              </div>
            </div>
            {serverResp.message && (
              <div className='server-msg'>
                {/* jeigu turim klaida is serverio, tai rodom pranešimą */}
                {serverResp.error ? (
                  <AiFillCloseCircle
                    style={{ color: 'red', marginRight: '0.5rem', fontSize: '3rem' }}
                  />
                ) : (
                  <AiFillCheckCircle
                    style={{ color: 'green', marginRight: '0.5rem', fontSize: '3rem' }}
                  />
                )}
                <h4 className='server-msg__text'>{serverResp.message}</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
