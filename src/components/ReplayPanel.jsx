import "./ReplayPanel.css";
export default function ReplayPanel({resetToDefault, handleSubmit}) {
	return (
		//one button trigger resetToDefault function passed AllSettings.jsx
		//the other button reuse same combination of settings
		<section id='replay-panel'>
			<button id='btn-reset-form' type='button' onClick={resetToDefault}>
				Begin a new adventure
			</button>

			<button id='btn-one-more-story' type='button' onClick={handleSubmit}>
				Tell another yarn
			</button>
		</section>
	);
}
