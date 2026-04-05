import { useState } from "react";
import QUESTIONS from "../data/questions.js";

export default function Quiz() {
	const [answers, setAnswers] = useState([]);
	const activeQuestion = answers.length;

	function handleAnswer(answer) {
		setAnswers((prev) => [...prev, answer]);
	}
	return (
		<div id="question">
			<h2>{QUESTIONS[activeQuestion].text}</h2>
			<ul id="answers">
				{QUESTIONS[activeQuestion].answers.map((answer, index) => (
					<li key={index} className="answer">
						<button>{answer}</button>
					</li>
				))}
			</ul>
			<p>Currently active Question: {activeQuestion}</p>
		</div>
	);
}
