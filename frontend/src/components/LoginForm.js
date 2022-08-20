import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export function LoginForm({ Login }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [info, setInfo] = useState({email: '', password: ''});
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if(user.email === '' || user.password === '') return;

      try {
        const res = await fetch(`/users/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ email: user.email, password: user.password })
        });

        if(!res.ok)
          throw Error('Email or password are wrong');

        const fetchedUser = await res.json();

        if(fetchedUser.admin === 'No') {
          navigate('user');
        } else {
          navigate('admin-user');
        }

      } catch(err) {
        alert(err);
      }
    }

    checkUser();
  }, [user]);

  const submitHandler = event => {
    event.preventDefault();
    setUser(info);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={event => setInfo({...info, email: event.target.value})} value={info.email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={event => setInfo({...info, password: event.target.value})} value={info.password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="outline-primary">Login</Button>
          </div>
        </div>
      </form>
    </div>
  );
}