export default function InfoBottom({
  totalQuestions,
  currentQuestion,
  points,
}) {
  return (
    <div className="info-bottom">
      <p>
        Question <b>{currentQuestion}</b>/ {totalQuestions}
      </p>
      <p>
        <b>{points}</b>/{totalQuestions * 10} points
      </p>
    </div>
  );
}
