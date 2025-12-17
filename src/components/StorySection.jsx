import Markdown from "react-markdown";
export default function StorySection({storyContent}) {
	return (
		<section className='story-section'>
			<h2>Lets Read a story</h2>
			<Markdown>{storyContent}</Markdown>
		</section>
	);
}
