export default function IllustrationSection({illustrationUrl}) {
	console.log("Illustration URL:", illustrationUrl);
	return (
		<section id='illustration-section'>
			<img
				id='illustration'
				src={illustrationUrl}
				alt='illustration of bedtime story'
			/>
		</section>
	);
}
