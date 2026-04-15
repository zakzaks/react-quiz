import { useState, useCallback } from "react";
import quizCompleteEimg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

import QUESTIONS from "../data/questions.js";

export default function Quiz() {
	const [answerState, setAnswerState] = useState("");
	const [answers, setAnswers] = useState([]);

	const activeQuestionIndex =
		answerState === "" ? answers.length : answers.length - 1;
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleAnswer = useCallback(function handleAnswer(answer) {
		setAnswerState("answered");
		setAnswers((prev) => [...prev, answer]);

		setTimeout(() => {
			if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
				setAnswerState("correct");
			} else {
				setAnswerState("wrong");
			}
			setTimeout(() => {
				setAnswerState("");
			}, 2000);
		}, 1000);
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
				questionText={QUESTIONS[activeQuestionIndex].text}
				answers={QUESTIONS[activeQuestionIndex].answers}
				selectedAnswer={answers[answers.length - 1]}
				answerState={answerState}
				onSelectAnswer={handleAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	);
}
