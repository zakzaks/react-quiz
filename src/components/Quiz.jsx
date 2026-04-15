import { useState, useCallback } from "react";
import QUESTIONS from "../data/questions.js";
import quizCompleteEimg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
	const [answerState, setAnswerState] = useState("");
	const [answers, setAnswers] = useState([]);
	const activeQuestion = answers.length;

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

	const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
	shuffledAnswers.sort(() => Math.random() - 0.5);

	return (
		<div id="quiz">
			<div className="question">
				<QuestionTimer
					key={activeQuestionIndex}
					timeout={10000}
					onTimeout={handleSkipAnswer}
				/>
				<h2>{QUESTIONS[activeQuestion].text}</h2>
				<ul id="answers">
					{shuffledAnswers.map((answer, index) => {
						const isSelected = answer[answer.length - 1] === answer;
						let cssClases = "";

						if (answerState === "answered" && isSelected) {
							cssClases = "selected";
						}

						if (
							answerState === "correct" ||
							answerState === "wrong" ||
							isSelected
						) {
							cssClases = answerState;
						}
						return (
							<li key={index} className="answer">
								<button
									onClick={() => handleAnswer(answer)}
									className={cssClases}
								>
									{answer}
								</button>
							</li>
						);
					})}
				</ul>
				<p>Currently active Question: {activeQuestion}</p>
			</div>
		</div>
	);
}
