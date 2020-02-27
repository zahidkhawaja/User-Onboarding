import React from 'react';
import './App.css';
import UserForm from "./components/UserForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>User Onboarding</h1>
      </header>
      <div className = "App-body">
        <UserForm />
      </div>
    </div>
  );
}

export default App;
