import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log("Set Timeout");
		setTimeout(onTimeout, timeout);
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log("Set interval");
		setInterval(() => {
			setRemainingTime((prev) => prev - 100);
		}, 100);
	}, []);

	return <progress id="question-time" max={timeout} value={remainingTime} />;
}
