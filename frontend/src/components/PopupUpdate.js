import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

export const PopupUpdate = () => {
  // Navigation tools
  const navigate = useNavigate();
  const { id } = useParams();

  const [updatedUser, setUpdatedUser] = useState({name: '', email: '', password: '', admin: 'No'});
  const [confirmState, setConfirmState] = useState(false);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const res = await fetch(`/users/update/${id}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ name: updatedUser.name, email: updatedUser.email, password: updatedUser.password, admin: updatedUser.admin })
        });

        if(!res.ok)
          throw Error('Check your inputs\' format');

      } catch(err) {
        alert(err);
      }
    }

    if(confirmState && !(updateUser.name === '' || updateUser.email === '' || updateUser.password === '')) {
      updateUser().then(() => {
        setConfirmState(false);
        setUpdatedUser({name: '', email: '', password: '', admin: 'No'});
        navigate(-1);
      });
    } else {
      setConfirmState(false);
    }
  }, [confirmState]);

  const submitHandler = event => {
    event.preventDefault();
    setConfirmState(true);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{'update User ' + id}</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              required
              className="form-control mt-1"
              placeholder="Enter Name"
              onChange={event => setUpdatedUser({...updatedUser, name: event.target.value})} 
              value={updatedUser.name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              required
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={event => setUpdatedUser({...updatedUser, email: event.target.value})} 
              value={updatedUser.email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              required
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={event => setUpdatedUser({...updatedUser, password: event.target.value})} 
              value={updatedUser.password}
            />
          </div>
          <div className="mt-3">
            <label>
              <input
                type="checkbox"
                checked={updatedUser.admin === 'Yes'}
                onChange={() => setUpdatedUser({...updatedUser, admin: updatedUser.admin === 'Yes' ? 'No' : 'Yes'})}
              />
              <span> Admin </span>
            </label>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="outline-primary" onClick={submitHandler}>Confirm</Button>
            <Button type="submit" variant="outline-danger" onClick={() => navigate(-1)}>Canel</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
