import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const adminHandleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('admin@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      history.push('/')
    }
  }
  const userHandleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('user1@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      history.push('/')
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <div className="login_demoUser">
          <button className="login-form__button__demoUser" onClick={adminHandleSubmit}>Log in as Admin</button>
          <button className="login-form__button__demoUser" onClick={userHandleSubmit}>Log in as User</button>
        </div>
      </form>
      <div className="create-account__button-container">Not on SupportTrack? <NavLink to='/signup'>Create an account</NavLink></div>
    </>
  );
}

export default LoginFormPage;
