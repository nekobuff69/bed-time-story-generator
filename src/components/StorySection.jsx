import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./StorySection.css";
export default function StorySection({storyContent}) {
	return (
		<section id='story-section'>
			<Markdown remarkPlugins={[remarkGfm]}>{storyContent}</Markdown>
		</section>
	);
}
