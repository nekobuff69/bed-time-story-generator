import {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import AllSettings from "./components/AllSettings";
import SubmitPanel from "./components/submitPanel";
import StorySection from "./components/StorySection";
import {getStoryContent} from "../utils/getAiResponse.js";

function App() {
	const [storyContent, setStorySection] = useState("");

	const sendStoryContent = (storyContentMd) => {
		setStorySection(storyContentMd);
	};

	return (
		<>
			<Header />
			<AllSettings
				getStoryContent={getStoryContent}
				sendStoryContent={sendStoryContent}
			/>

			{/* <SubmitPanel /> */}
			{storyContent !== "" && <StorySection storyContent={storyContent} />}
		</>
	);
}

export default App;
