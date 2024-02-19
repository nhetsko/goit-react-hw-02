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

    const [feedback, setFeedback] = useState(() => {
        const savedFeedback = window.localStorage.getItem("saved-feedback");
        return savedFeedback ? JSON.parse(savedFeedback) : initialState;
    });

    useEffect(() => {
        window.localStorage.setItem("saved-feedback", JSON.stringify(feedback));
    }, [feedback]);

    const updateFeedback = (feedbackType) => {
        setFeedback({
            ...feedback,
            [feedbackType]: feedback[feedbackType] + 1,
        });
    };

    const resetFeedback = () => {
        setFeedback(initialState);
    };

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const hasFeedback = totalFeedback > 0;
    const positiveFeedback = Math.round((totalFeedback > 0 ? ((feedback.good + feedback.neutral) / totalFeedback) * 100 : 0));

    return (
        <div>
            <Description />
            <div className={css.optionContainer}>
                <Options onFeedbackClick={updateFeedback} feedbackType="good"> Good</Options>
                <Options onFeedbackClick={updateFeedback} feedbackType="neutral">Neutral</Options>
                <Options onFeedbackClick={updateFeedback} feedbackType="bad">Bad</Options>
                {hasFeedback && <Options onFeedbackClick={resetFeedback} feedbackType="reset">Reset</Options>}
            </div>

            {hasFeedback ? (
                    <Feedback {...feedback} total={totalFeedback} positivePercentage={positiveFeedback}></Feedback> 
            ) : (
                <Notification>No feedback collected yet</Notification>
            )}
        </div>
    );
}
