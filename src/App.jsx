import {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import AllSettings from "./components/AllSettings";
import StorySection from "./components/StorySection";
import {getStoryContent} from "../utils/getAiResponse.js";

function App() {
	const [storyContent, setStorySection] = useState("");
	const sendStoryContent = (storyContentMd) => {
		// hide submit-panel when settings data submitted, story generating
		const submitPanelEl = document.getElementById("submit-panel");
		if (submitPanelEl) {
			submitPanelEl.remove();
		}

		setStorySection(storyContentMd);
	};
	useEF;
	return (
		<>
			<Header />
			<AllSettings
				getStoryContent={getStoryContent}
				sendStoryContent={sendStoryContent}
			/>
			{storyContent !== "" && <StorySection storyContent={storyContent} />}
		</>
	);
}

export default App;
