import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Popup = () => {
  const [newUser, setNewUser] = useState({name: '', email: '', password: '', admin:'No'});
  const [confirmState, setConfirmState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const addUser = async () => {
      try {
        const res = await fetch(`/users/add`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ name: newUser.name, email: newUser.email, password: newUser.password, admin: newUser.admin })
        });

        if(!res.ok)
          throw Error('Check your inputs\' format');
        
      } catch(err) {
        alert(err);
      }
    }

    if(!(newUser.name === '' || newUser.email === '' || newUser.password === '')) {
      addUser().then(navigate(-1));
    } else {
      setConfirmState(false);
    }
  }, [confirmState]);

  const submitHandler = event => {
    event.preventDefault();
    setConfirmState(true);
  }

  const cancelHandler = event => {
    event.preventDefault();
    navigate(-1);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">New User</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              required
              className="form-control mt-1"
              placeholder="Enter Name"
              onChange={event => setNewUser({...newUser, name: event.target.value})} 
              value={newUser.name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              required
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={event => setNewUser({...newUser, email: event.target.value})} 
              value={newUser.email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              required
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={event => setNewUser({...newUser, password: event.target.value})} 
              value={newUser.password}
            />
          </div>
          <div className="mt-3">
            <label>
              <input
                type="checkbox"
                value='Yes'
                onChange={() => setNewUser({...newUser, admin: newUser.admin === 'Yes' ? 'No' : 'Yes'})}
              />
              <span> Admin </span>
            </label>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="outline-primary" onClick={submitHandler}>Confirm</Button>
            <Button type="submit" variant="outline-danger" onClick={cancelHandler}>Canel</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
