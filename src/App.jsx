import { useState } from 'react';
import Header from './Components/Header';
import Start from './Components/Start';
import QuizList from './Components/QuizList';
import Footer from './Components/Footer';

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div>
      <Header />
      {quizStarted ? (
        <QuizList />
      ) : (
        <Start onStart={() => setQuizStarted(true)} />
      )}
      <Footer/>
    </div>
  );
}
