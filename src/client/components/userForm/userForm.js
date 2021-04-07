import {
  useState
} from 'react';
import './userForm.css';

const onChangeWrapper = (setter) => (e) => setter(e.currentTarget.value);

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('#000');
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(name, avatar);
  };

  return (
    <div className="user-form purple-background">
      <h2 className="user-form__header">User Form</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="user-form__wrapper">
          <input required type="text" value={name} onChange={onChangeWrapper(setName)} name="name" placeholder="Name" />
          <input required type="color" value={avatar} onChange={onChangeWrapper(setAvatar)} name="avatar" />
          <label htmlFor="avatar">Colour</label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UserForm;