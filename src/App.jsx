import {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import AllSettings from "./components/AllSettings";
import StorySection from "./components/StorySection";
import IllustrationSection from "./components/IllustrationSection";
import {getStoryContent} from "../utils/getAiResponse.js";
// import ReplayPanel from "./components/ReplayPanel.jsx";

function App() {
	const [storyContent, setStorySection] = useState("");
	const [isStreamingComplete, setIsStreamingComplete] = useState(false);

	const sendStoryContent = (storyContentMd) => {
		setStorySection(storyContentMd);
	};

	const onStreamComplete = () => {
		setIsStreamingComplete(true);
		// You can add image generation logic here
		console.log("Story streaming completed!");
	};

	const resetStreamingState = () => {
		setIsStreamingComplete(false);
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
			{isStreamingComplete && <IllustrationSection />}
		</>
	);
}

export default App;
