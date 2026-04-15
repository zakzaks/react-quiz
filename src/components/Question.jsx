import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../data/questions.js";

export default function Question({
	questionIndex,
	onSelectAnswer,
	onSkipAnswer,
}) {
	const [answer, setAnswer] = useState({
		selectAnswer: "",
		isCorrect: null,
	});

	let timer = 10000;

	if (answer.selectAnswer) {
		timer = 3000;
	}

	function handleSelectAnswer(answer) {
		setAnswer({
			selectAnswer: answer,
			isCorrect: null,
		});

		setTimeout(() => {
			setAnswer({
				selectAnswer: answer,
				isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
			});

			setTimeout(() => {
				onSelectAnswer(answer);
			}, 2000);
		}, 1000);
	}

	let answerState = "";

	if (answer.selectAnswer && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? "correct" : "wrong";
	} else if (answer.selectAnswer) {
		answerState = "answered";
	}

	return (
		<div id="question">
			<QuestionTimer
				key={timer}
				timeout={timer}
				onTimeout={answer.selectAnswer === "" ? onSkipAnswer : null}
				mode={answerState}
			/>
			<h2>{QUESTIONS[questionIndex].text}</h2>
			<Answers
				answers={QUESTIONS[questionIndex].answers}
				selectedAnswer={answer.selectAnswer}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
