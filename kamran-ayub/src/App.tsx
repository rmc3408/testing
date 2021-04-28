import React from 'react';
import LoginForm from './LoginForm';
import './App.css';

function noop() {
  return;
}

function App() {
  return (
    <div className="App">
      <LoginForm
        shouldRemember={true}
        onPasswordChange={noop}
        onRememberChange={noop}
        onSubmit={noop}
        onUsernameChange={noop}
      />
    </div>
  );
}

export default App;
