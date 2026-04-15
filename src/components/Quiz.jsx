import { useState, useCallback } from "react";
import Question from "./Question.jsx";

import QUESTIONS from "../data/questions.js";
import Summary from "./Summary.jsx";

export default function Quiz() {
	const [answers, setAnswers] = useState([]);

	const activeQuestionIndex = answers.length;
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleAnswer = useCallback(function handleAnswer(answer) {
		setAnswers((prev) => [...prev, answer]);
	}, []);

	const handleSkipAnswer = useCallback(
		() => handleAnswer(null),
		[handleAnswer],
	);

	if (quizIsComplete) {
		return <Summary userAnswers={answers} />;
	}

	return (
		<div id="quiz">
			<Question
				key={activeQuestionIndex}
				questionIndex={activeQuestionIndex}
				onSelectAnswer={handleAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	);
}
