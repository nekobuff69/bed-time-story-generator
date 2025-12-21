import {useState} from "react";
// import "./App.css";
import Header from "./components/Header";
import AllSettings from "./components/AllSettings";
import StorySection from "./components/StorySection";
import IllustrationSection from "./components/IllustrationSection";
import {getStoryContent} from "../utils/getStoryContent.js";
import getIllustrationPrompt from "../utils/getIllustrationPrompt.js";
import getComfyWorkflow from "../utils/getComfyWorkflow.js";
import {runWorkflow} from "../utils/runComfyWorkflow.js";

function App() {
	const [storyContent, setStorySection] = useState("");
	const [isStreamingComplete, setIsStreamingComplete] = useState(false);

	const illustrationPlaceholderUrl = "/illustration-placeholder.png";
	const [illustrationUrl, setIllustrationUrl] = useState(
		illustrationPlaceholderUrl
	);
	const getIllustration = async (storyContent) => {
		console.log(
			"DEBUG: getIllustration called with storyContent:",
			storyContent
		);
		const illlustrationPrompt = await getIllustrationPrompt(storyContent);
		const customizedComfyWorkflow = getComfyWorkflow(illlustrationPrompt);
		const updatedIllustrationUrl = await runWorkflow(customizedComfyWorkflow);
		setIllustrationUrl(updatedIllustrationUrl);
	};

	const sendStoryContent = (storyContentMd) => {
		setStorySection(storyContentMd);
	};

	const onStreamComplete = (finalStory) => {
		setIsStreamingComplete(true);
		console.log("Story streaming completed!");
		console.log("DEBUG: onStreamComplete called with finalStory:", finalStory);
		//When stream is complete, trigger image generation pipeline
		//And render it
		getIllustration(finalStory);
	};

	const resetStreamingState = () => {
		setIsStreamingComplete(false);
		setIllustrationUrl(illustrationPlaceholderUrl);
	};

	return (
		<>
			<Header />
			<AllSettings
				getStoryContent={getStoryContent}
				sendStoryContent={sendStoryContent}
				onStreamComplete={onStreamComplete}
				resetStreamingState={resetStreamingState}
			/>
			{storyContent !== "" && <StorySection storyContent={storyContent} />}
			{isStreamingComplete && (
				<IllustrationSection illustrationUrl={illustrationUrl} />
			)}
		</>
	);
}

export default App;
