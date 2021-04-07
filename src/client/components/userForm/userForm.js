import {
  useState
} from 'react';

import Button from "../Button";
import Panel from "../Panel";

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
      <h2 className="user-form__header">Welcome to SongHack</h2>
      <div className="space"></div>
      <div className="user-form__wrapper">
        <label htmlFor="name">Nickname:</label>
        <input required type="text" value={name} onChange={onChangeWrapper(setName)} name="name" placeholder="Parrot Pirate" />
        <br/>
        <label htmlFor="avatar">Colour:</label><br/>
        <input required type="color" value={avatar} onChange={onChangeWrapper(setAvatar)} name="avatar" />
        <br/><br/>
        <Button onClick={onSubmitHandler}>Play</Button>
        <br/>
      </div>
    </div>
  )
}

export default UserForm;