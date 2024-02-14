import css from './Option.module.css';
export default function Options({ onTrack, children }) {
    return (
        <div>
            <button className={css.optionButton} onClick={onTrack}>
                {children}
            </button>
        </div>
    );
}