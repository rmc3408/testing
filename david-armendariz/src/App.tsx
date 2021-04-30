import React, { useState } from 'react';
import './App.css';
import AppForm from './AppForm';

function App() {
  const [txt, setText] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setText(e.currentTarget.value);
  }


  return (
    <div className="App">
      <AppForm text={txt} fnChange={handleChange} >Search Header</AppForm>
      <p>You typed: {txt ?? 'TYPE'}</p>
    </div>
  );
}

export default App;
