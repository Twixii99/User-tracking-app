import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export const AppletTable = ({ privilage }) => {
  const [users, setUsers] = useState([]);
  const selectedUsers = new Map();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => { 
      try {
        const res = await fetch('/users');

        if(!res.ok)
          throw Error('Fetching users causes an error check your connections')

        setUsers(await res.json());
      } catch(err) {
          alert(err);
      } 
    }

    fetchUsers();
  }, []);

  const updateHandler = () => {
    for(const selectedUserID of selectedUsers.keys()) {
      navigate(`/update-user/${selectedUserID}`)
    }
  }

  const removeHandler = async () => {
    const removeUser = async (userId) => {
      try {
        const res = await fetch(`/users/remove/${userId}`, {
          method: 'DELETE',
        });

        if(!res.ok)
          throw Error('Check your inputs\' format');

      } catch(err) {
        alert(err);
      }
    } 

    for(const selectedUser of selectedUsers.keys()) {
      await removeUser(selectedUser);
    }
    
    navigate(0);
  }

  return (
    <div>
      <div className='table-container'>
        <table className='table table-hover'>
          <thead className='table-light'>
            <tr>
              {
                privilage === 'Yes' ? <th>#</th> : ''
              }
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    {
                      privilage === 'Yes' ?
                      (
                        <td>
                          <input type="checkbox" value='Yes' onChange={
                            () => {
                              if(selectedUsers.has(user._id))
                                selectedUsers.delete(user._id);
                              else
                                selectedUsers.set(user._id, user);
                            }
                          }/>
                        </td>
                      ) : ''
                    }
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.admin}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {
        privilage === 'Yes' ? (
          <div className='btns-container'>
            <div className='btns'>
              <Button variant="outline-primary" onClick={ () => { navigate('/add-user'); } }> add user </Button>{' '}
              <Button variant="outline-success" onClick={ updateHandler }> update user </Button>{' '}
              <Button variant="outline-danger" onClick={ removeHandler }> remove user </Button>
            </div>
          </div>
        ): ''
      }
    </div>
  )
}
