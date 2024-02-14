import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import css from './App.module.css'

export default function App() {
    const [options, setOptions] = useState(() => {
        const savedClicks = window.localStorage.getItem("saved-clicks");
        if (savedClicks !== null) {
            try {
                return JSON.parse(savedClicks); // Parse JSON string
            } catch (error) {
                console.error("Error parsing saved data from localStorage:", error);
                return {
                    good: 0,
                    neutral: 0,
                    bad: 0
                };
            }
        }
        return {
            good: 0,
            neutral: 0,
            bad: 0
        };
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
        setOptions({
            good: 0,
            neutral: 0,
            bad: 0
        });
    };

    const totalFeedback = options.good + options.neutral + options.bad;
    const hasFeedback = totalFeedback > 0;
    const positiveFeedback = Math.round(((options.good + options.neutral) / totalFeedback) * 100);

    return (
            <div>
            <Description />
            
            <div className={css.optionContainer}>
            <Options onTrack={() => updateFeedback('good')}> Good</Options>
            <Options onTrack={() => updateFeedback('neutral')}>Neutral</Options>
            <Options onTrack={() => updateFeedback('bad')}>Bad</Options>
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
