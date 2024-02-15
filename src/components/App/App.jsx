import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import css from './App.module.css';

export default function App() {
    const initialState = {
        good: 0,
        neutral: 0,
        bad: 0
    };

    const [options, setOptions] = useState(() => {
        const savedClicks = window.localStorage.getItem("saved-clicks");
        return savedClicks ? JSON.parse(savedClicks) : initialState;
    });

    useEffect(() => {
        window.localStorage.setItem("saved-clicks", JSON.stringify(options));
    }, [options]);

    const updateFeedback = (feedbackType) => {
        setOptions({
            ...options,
            [feedbackType]: options[feedbackType] + 1,
        });
    };

    const resetFeedback = () => {
        setOptions(initialState);
    };

    const totalFeedback = options.good + options.neutral + options.bad;
    const hasFeedback = totalFeedback > 0;
    const positiveFeedback = Math.round((totalFeedback > 0 ? ((options.good + options.neutral) / totalFeedback) * 100 : 0));

    return (
        <div>
            <Description />
            <div className={css.optionContainer}>
                <Options onTrack={updateFeedback} feedbackType="good"> Good</Options>
                <Options onTrack={updateFeedback} feedbackType="neutral">Neutral</Options>
                <Options onTrack={updateFeedback} feedbackType="bad">Bad</Options>
                {hasFeedback && <Options onTrack={resetFeedback}>Reset</Options>}
            </div>

            {hasFeedback ? (
                <>
                    <Feedback value={options.good}>Good</Feedback>
                    <Feedback value={options.neutral}>Neutral</Feedback>
                    <Feedback value={options.bad}>Bad</Feedback>
                    <Feedback value={totalFeedback}>Total</Feedback>
                    <Feedback value={positiveFeedback}>Positive</Feedback>
                </>
            ) : (
                <Notification>No feedback collected yet</Notification>
            )}
        </div>
    );
}
