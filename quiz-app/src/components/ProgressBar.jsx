export default function ProgressBar({ percentDone }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentDone}%` }}></div>
    </div>
  );
}
