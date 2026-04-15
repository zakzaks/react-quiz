import { useState, useCallback } from "react";
import quizCompleteEimg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

import QUESTIONS from "../data/questions.js";

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
		return (
			<div div id="summary">
				<img src={quizCompleteEimg} alt="Quiz Complete" />
				<h2>Quiz Complete!</h2>
			</div>
		);
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
