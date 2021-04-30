import React, { useState, useEffect } from 'react';
import './App.css';
import AppForm from './AppForm';
import { User, getUser } from './getUser';



function App() {
  const [txt, setText] = useState('');
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function getData() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    }
    getData();
  }, [txt]);
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setText(e.currentTarget.value);
  }


  return (
    <div className="App">
      <AppForm text={txt} fnChange={handleChange} >Search Header</AppForm>
      <p>You typed: {txt ?? 'TYPE'}</p>
      <hr />
      {user ? <p>Username: {user.name}</p> : null}
    </div>
  );
}

export default App;
