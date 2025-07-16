import reactImage from '../assets/quiz-logo.png';

export default function Header() {
  return (
    <header>
      <img src={reactImage} alt="Quiz Logo" />
      <h1>Quizeria</h1>
    </header>
  );
}
