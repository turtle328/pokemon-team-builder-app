import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import Modal from 'react-modal';

const LoginModal = ({ isOpen, setModalOpen, setUser }) => {
  Modal.setAppElement('#root');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [openSnackbar] = useSnackbar();

  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('/authenticate', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setModalOpen(false);
        setUser(username);
        openSnackbar('Login successful!');
      } else {
        const resJson = await res.json();
        openSnackbar(resJson.message);
      }
    } catch (err) {
      console.error(err);
      openSnackbar('An error occurred while trying to login. Please try again.');
    }

    resetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      className="Modal"
      overlayClassName="Overlay"
      onRequestClose={() => setModalOpen(false)}>
      <form className="pure-form pure-form-stacked modal-form" onSubmit={onSubmit}>
        <fieldset>
          <legend style={{ borderBottom: '1px solid gray' }}>Login your account</legend>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            maxLength="20"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            maxLength="30"
          />
        </fieldset>
        <button type="submit" className="pure-button pure-input-1 pure-button-primary">
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
