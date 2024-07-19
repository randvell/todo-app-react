// import style from './LoginForm.module.scss';

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loadTasks, setCurrentUser} from '../../../store/tasks/tasksSlice';

const LoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    const login = name.trim();
    if (login) {
      dispatch(setCurrentUser(login));
      dispatch(loadTasks());
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="nameInput"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
