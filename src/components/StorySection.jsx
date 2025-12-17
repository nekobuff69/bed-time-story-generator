import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function StorySection({storyContent}) {
	return (
		<section className='story-section'>
			<Markdown remarkPlugins={[remarkGfm]}>{storyContent}</Markdown>
		</section>
	);
}
