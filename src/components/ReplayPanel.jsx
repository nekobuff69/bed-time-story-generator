export default function ReplayPanel({resetToDefault}) {
	return (
		//one button trigger resetToDefault function passed AllSettings.jsx
		//the other button reuse same combination of settings
		<section id='replay-panel'>
			<button id='btn-reset-form' type='button' onClick={resetToDefault}>
				Start by default
			</button>

			<button id='btn-one-more-story' type='submit' form='settings-form'>
				One more like this
			</button>
		</section>
	);
}
