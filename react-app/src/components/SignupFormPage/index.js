import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css'
function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(false)
  const [errors, setErrors] = useState([]);


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (password === confirmPassword) {

        const data = await dispatch(signUp(username, firstName, lastName, email, phone, password, admin));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors({...errors, 'confirm': 'Confirm Password field must be the same as the Password field'});
    }
  };



  return (
    <section className="signup__section">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="signup-form_title">Sign Up</h1>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer"><div>Email</div>{errors.email !== undefined && <div className="ErrorText">{errors.email}</div>}</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-form__input"
          />
        </label>
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer"><div>Phone</div>{errors.phone !== undefined && <div className="ErrorText">{errors.phone}</div>}</div>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone('+' + e.target.value)}
            className="signup-form__input"
          />
        </label>
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer"><div>Username</div>{errors.username !== undefined && <div className="ErrorText">{errors.username}</div>}</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-form__input"
          />
        </label>
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer"><div>First Name</div>{errors.firstName !== undefined && <div className="ErrorText">{errors.firstName}</div>}</div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="signup-form__input"
          />
        </label>
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer"><div>Last Name</div>{errors.lastName !== undefined && <div className="ErrorText">{errors.lastName}</div>}</div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="signup-form__input"
          />
        </label>
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer"><div>Password</div>{errors.password !== undefined && <div className="ErrorText">{errors.password}</div>}{errors.confirm !== undefined && <div className="ErrorText">{errors.confirm}</div>}</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-form__input"
          />
        </label>
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer">Confirm Password</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-form__input"
          />
        </label>
        <label className="signup-form__label">
          <div className="signup-form__label_textContainer">
            <div>Admin</div>
          </div>
          <select
            value={admin}
            onChange={(e) => setAdmin(e.target.value === "true")}
            className="signup-form__input"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>
        <div className="signup-form__buttons__container">
          <button type="submit" className="signup-form__button">Sign Up</button>
        </div>

      </form>
    </section>
  );
}

export default SignupFormPage;
