import "./SubmitPanel.css";
export default function SubmitPanel({handleSubmit}) {
	return (
		<section id='submit-panel'>
			<h1 id='submit-instruction'>The loom is prepared! Shall we begin?</h1>
			<button id='btn-submit' type='button' onClick={handleSubmit}>
				Spin the Tale
			</button>
		</section>
	);
}
