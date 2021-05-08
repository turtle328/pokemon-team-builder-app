import React, { useState } from 'react';
import styles from './index.module.scss';

const GetUsersForm = () => {
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();

  return (
    <div>
      <form className={`pure-form pure-form-stacked`}>
        <fieldset>
          <legend></legend>
          <div className={`${styles.flexContainer} ${styles.wrap}`}>
            <button
              className={`pure-button pure-button-primary ${styles.button}`}
              style={{ marginRight: '20px' }}>
              Get Users
            </button>
            <div>
              <label htmlFor="users">Select a user</label>
              <select id="users" name="users" style={{ minWidth: '180px' }}></select>
            </div>
            <button className={`pure-button button-danger ${styles.button}`}>Delete User</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default GetUsersForm;
