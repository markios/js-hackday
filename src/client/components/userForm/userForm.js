import {
  useContext
} from 'react';
import { store } from '../../store/gameStore';
import './userForm.css';

const UserForm = () => {
  const state = useContext(store);
  const { onSubmitUser } = state;

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitUser(1, 2);
  };

  return (
    <div className="user-form purple-background">
      <h2 className="user-form__header">User Form</h2>
      <form onSubmit={onSubmit}>
        <div className="user-form__wrapper">
          <input type="text" name="name" placeholder="Name"></input>
          <input type="color" name="avatar"></input>
          <label htmlFor="avatar">Colour</label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UserForm;