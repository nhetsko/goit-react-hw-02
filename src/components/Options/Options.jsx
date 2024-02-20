import css from './Option.module.css';

export default function Options({ feedbackType, onReset, isReset }) {
  return (
    <div className={css.options}>
      <button onClick={() => feedbackType('good')}>Good</button>
      <button onClick={() => feedbackType('neutral')}>Neutral</button>
      <button onClick={() => feedbackType('bad')}>Bad</button>
      {isReset ? <button onClick={onReset}>Reset</button> : null}
    </div>
  );
}