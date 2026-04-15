import { useState } from "react";
import QUESTIONS from "../data/questions.js";
import quizCompleteEimg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
	const [answers, setAnswers] = useState([]);
	const activeQuestion = answers.length;

	const activeQuestionIndex = answers.length;
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	function handleAnswer(answer) {
		setAnswers((prev) => [...prev, answer]);
	}

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
				<QuestionTimer timeout={10000} onTimeout={() => handleAnswer(null)} />
				<h2>{QUESTIONS[activeQuestion].text}</h2>
				<ul id="answers">
					{shuffledAnswers.map((answer, index) => (
						<li key={index} className="answer">
							<button onClick={() => handleAnswer(answer)}>{answer}</button>
						</li>
					))}
				</ul>
				<p>Currently active Question: {activeQuestion}</p>
			</div>
		</div>
	);
}
