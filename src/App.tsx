// Your parent component
import React, { useState } from 'react';
import Login from './components/login/login';
import HOME from './components/home/myHome';
import './App.css';

const App: React.FC = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      {login ? (
        <HOME />
      ) : (
        <Login setLogin={setLogin} />
      )}
    </>
  );
};

export default App;
