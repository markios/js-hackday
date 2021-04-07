import {
  useState
} from 'react';

import Button from "../Button";
import Panel from "../Panel";

import './userForm.css';

const onChangeWrapper = (setter) => (e) => setter(e.currentTarget.value);

const UserForm = ({ onSubmit }) => {
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(getRandomColor());
  
  const onSubmitHandler = (e) => {
    if(!name || !name.length) {
      return window.alert("Enter a name!");
    }
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