import css from './Option.module.css';

export default function Options({ onTrack, feedbackType, children }) {
    return (
        <div>
            <button className={css.optionButton} onClick={() => onTrack(feedbackType)}>
                {children}
            </button>
        </div>
    );
}
