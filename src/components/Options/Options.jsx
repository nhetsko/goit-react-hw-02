import css from './Option.module.css';

export default function Options({ onFeedbackClick, feedbackType, children }) {
    return (
        <div>
            {feedbackType === "reset" ? (
                <button className={css.optionButton} onClick={onFeedbackClick}>
                    {children}
                </button>
            ) : (
                <button className={css.optionButton} onClick={() => onFeedbackClick(feedbackType)}>
                    {children}
                </button>
            )}
        </div>
    );
}
