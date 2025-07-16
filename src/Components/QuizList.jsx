import { useEffect, useRef, useState } from 'react';
import allQuestions from '../data/allQuestions'
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizList() {
  const [questionList, setQuestionList] = useState([]);
  const [progress, setProgress] = useState(100);
  const [quizOver, setQuizOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [showStart, setShowStart] = useState(true);

  const index = useRef(0);
  const progressIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function getProgressColor(value) {
    if (value > 66) return 'green';
    if (value > 33) return 'yellow';
    return 'red';
  }

  function startTimers() {
    clearInterval(progressIntervalRef.current);
    clearTimeout(timeoutRef.current);

    let timeLeft = 20;
    let elapsed = 0;
    setProgress(100);

    progressIntervalRef.current = setInterval(() => {
      elapsed += 0.1;
      const newProgress = 100 - (elapsed / timeLeft) * 100;
      setProgress(newProgress);

      if (elapsed >= timeLeft) {
        clearInterval(progressIntervalRef.current);
        handleNextQuestion();
      }
    }, 100);

    timeoutRef.current = setTimeout(() => {
      handleNextQuestion();
    }, timeLeft * 1000);
  }

  function handleNextQuestion() {
    if (index.current < questionList.length - 1) {
      index.current++;
      startTimers();
    } else {
      finishQuiz();
    }
  }

  function handleClick(answer) {
    clearTimeout(timeoutRef.current);
    clearInterval(progressIntervalRef.current);

    const qid = questionList[index.current].id;
    const newUserAnswers = { ...userAnswers, [qid]: answer };
    setUserAnswers(newUserAnswers);

    handleNextQuestion();
  }

  function finishQuiz(finalAnswers = userAnswers) {
    const correctCount = questionList.reduce((score, q) => {
      const ans = finalAnswers[q.id];
      return ans === q.correct ? score + 1 : score;
    }, 0);

    setScore(correctCount);
    setQuizOver(true);
    clearTimeout(timeoutRef.current);
    clearInterval(progressIntervalRef.current);
  }

  function restartQuiz() {
    index.current = 0;
    setUserAnswers({});
    setScore(0);
    setQuizOver(false);
    setProgress(100);
    setShowStart(true);
    clearTimeout(timeoutRef.current);
    clearInterval(progressIntervalRef.current);
  }

  function startQuiz() {
    setShowStart(false);
    const selected = shuffleArray(allQuestions).slice(0, 15);
    const withShuffledAnswers = selected.map(q => ({ ...q, answers: shuffleArray(q.answers) }));
    setQuestionList(withShuffledAnswers);
    index.current = 0;
    startTimers();
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, []);

  if (showStart) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h1>Welcome to the History Quiz</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            marginBottom: '20px',
            width: '80%',
            maxWidth: '300px'
          }}
        />
        <br />
        <button
          onClick={startQuiz}
          disabled={!username.trim()}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#6200ee',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizOver) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <h2>{username}, your score: {score} / {questionList.length}</h2>
          {score >= questionList.length / 2 ? (
            <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 शाबाश! आपने अच्छा किया!</p>
          ) : (
            <p style={{ color: 'red', fontWeight: 'bold' }}>थारे बस की बात कोनी 😅</p>
          )}

          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            {questionList.map((q, i) => (
              <div key={q.id} style={{ marginBottom: '10px' }}>
                <strong>Q{i + 1}: {q.text}</strong>
                <p>
                  Your Answer: <span style={{ color: userAnswers[q.id] === q.correct ? 'green' : 'red' }}>
                    {userAnswers[q.id] || 'No Answer'}
                  </span>
                </p>
                {userAnswers[q.id] !== q.correct && (
                  <p>Correct Answer: <strong>{q.correct}</strong></p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={restartQuiz}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '8px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none'
            }}
          >
            Restart Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questionList[index.current];

  return (
    <div id="quiz" style={{ maxWidth: '500px', margin: '20 auto' }}>
      <motion.div
        key={progress}
        style={{
          height: '8px',
          width: `${progress}%`,
          backgroundColor: getProgressColor(progress),
          transition: 'width 100ms linear',
          borderRadius: '4px',
          marginBottom: '16px',
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion?.id}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div id="question" style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>
            {currentQuestion?.text}
          </div>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentQuestion?.answers.map((ans, i) => (
              <li key={i} style={{ background: '#f0f0f0', margin: '6px 0', padding: '10px', borderRadius: '5px' }}>
                <button
                  onClick={() => handleClick(ans)}
                  style={{
                    background: '#6200ee',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '6px',
                    width: '100%',
                    cursor: 'pointer'
                  }}
                >
                  {ans}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
