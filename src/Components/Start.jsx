export default function Start({ onStart }) {
  return (
    <div className="start">
      <div className="start-header">
        <h1 className="start-title">Do you want to Start</h1>
        <p className="start-score">Score: <span>0</span></p>
        <button className="start-btn" onClick={onStart}>Start</button>
      </div>
    </div>
  );
}
