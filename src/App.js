import React from 'react';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import './App.css'
function App() {
  return (
    <div className="App">
      <h1 className='heading'>Quiz App Jyoti</h1>
      {/* <QuizForm /> */}
      <QuizList />
    </div>
  );
}

export default App;
