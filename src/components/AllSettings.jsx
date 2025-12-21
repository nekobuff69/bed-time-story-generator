import {useState} from "react";
import SettingItem from "./SettingItem";
import {defaultSettings} from "../data/defaultSettings.js";
import SubmitPanel from "./submitPanel.jsx";
import ReplayPanel from "./ReplayPanel.jsx";
import "./AllSettings.css";

export default function AllSettings({
	getStoryContent,
	sendStoryContent,
	onStreamComplete,
	resetStreamingState,
}) {
	// State: Manages array of setting objects, each with a value array for customizable options
	const [allSettings, setAllSettings] = useState(defaultSettings);
	const [showReplayPanel, setShowReplayPanel] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	// Rest the form to default states. Clear story section content, hide ReplayPanel.
	// User can choose/enter another setting combinations to generate new story
	const resetToDefault = () => {
		setAllSettings([...defaultSettings]);
		sendStoryContent("");
		setShowReplayPanel(false);
		setFormSubmitted(false);
		resetStreamingState();
	};

	// Handler: Removes specified value from the value array of the setting at given index using filter
	const handleRemoveValue = (valueToRemove, oneSettingIndex) => {
		setAllSettings((prev) =>
			prev.map((oneSettingItem) => {
				if (prev.indexOf(oneSettingItem) === oneSettingIndex) {
					// For the matching setting, filter out the value to remove from its value array
					const updatedValue = oneSettingItem.value.filter((existingValue) => {
						return existingValue !== valueToRemove;
					});
					// Return updated setting object with filtered value array
					return {
						...oneSettingItem,
						value: updatedValue,
					};
				} else {
					// Return unchanged setting for non-matching items
					return oneSettingItem;
				}
			})
		);
	};

	// Handler: Adds new value to the value array of the setting at given index using spread
	const handleAddValue = (targetInputValue, oneSettingIndex) => {
		setAllSettings((prev) =>
			prev.map((oneSettingItem) => {
				if (prev.indexOf(oneSettingItem) === oneSettingIndex) {
					// For the matching setting, spread existing values and append new one
					const updatedValue = [...oneSettingItem.value, targetInputValue];
					// Return updated setting object with new value array
					return {
						...oneSettingItem,
						value: updatedValue,
					};
				} else {
					// Return unchanged setting for non-matching items
					return oneSettingItem;
				}
			})
		);
	};

	const getAllSettingsData = (allSettings) => {
		const characterData = allSettings[0].value;
		const moodData = allSettings[1].value;
		const environmentData = allSettings[2].value;
		const themeData = allSettings[3].value;
		const allSettingsData = {
			character: characterData,
			mood: moodData,
			environment: environmentData,
			theme: themeData,
		};

		return allSettingsData;
	};

	//This function handles both first-time call to AI and regenerating
	//So it includes some reset functions besides other acutal productive function
	const handleSubmit = async () => {
		// e.preventDefault();
		const settingsData = getAllSettingsData(allSettings);
		sendStoryContent(""); // Clear the story section before new story generated
		const storyPlaceHolder = "# The tale is weaving itself... #"; // To make StorySection visible, when the actual story has not been generated yet
		sendStoryContent(storyPlaceHolder);
		setFormSubmitted(true);
		//Reset streaming state to hide IllustrationSection
		//This is necessary when regenerating
		resetStreamingState();

		// Start streaming with incremental updates
		let isFirstChunk = true;
		let accumulatedStory = storyPlaceHolder;
		await getStoryContent(settingsData, (chunk) => {
			console.log("DEBUG: Received chunk:", chunk);
			//Before accumulating story content, I need to replace the placeholder with first chunk of story stream
			if (isFirstChunk) {
				accumulatedStory = chunk;
				sendStoryContent(chunk);
				isFirstChunk = false;
			} else {
				// Append each chunk to the current story content
				accumulatedStory += chunk;
				sendStoryContent((prev) => prev + chunk);
			}
		});
		console.log("DEBUG: Streaming complete");

		// Signal that streaming is complete
		onStreamComplete(accumulatedStory);
		setShowReplayPanel(true);
	};

	//optionLimit decides max options each setting(character, mood, environment, theme) can get.
	const optionLimit = 2;
	//Only render submit panel when each setting's options reach the limit
	const optionsReachLimit = allSettings.every((oneSettingItem) => {
		return oneSettingItem.value.length >= optionLimit;
	});

	// Render: Maps each setting to SettingItem component, passing setting data and callback handlers
	const allSettingEl = allSettings.map((oneSetting) => {
		return (
			<SettingItem
				key={oneSetting.id}
				oneSetting={oneSetting}
				handleAddValue={handleAddValue}
				handleRemoveValue={handleRemoveValue}
				optionLimit={optionLimit}
			/>
		);
	});

	return (
		<>
			{formSubmitted === false && (
				<form id='settings-form'>
					<h2 id='instruction'>
						Welcome, young dream-weaver! Let's spin a magical tale together.
						Pick your heroes, set the mood, and discover wondrous worlds—or
						conjure your own enchantments!
					</h2>
					<div className='settings-container'>{allSettingEl}</div>
				</form>
			)}
			{optionsReachLimit && !formSubmitted && (
				<SubmitPanel handleSubmit={handleSubmit} />
			)}
			{showReplayPanel && (
				<ReplayPanel
					resetToDefault={resetToDefault}
					handleSubmit={handleSubmit}
				/>
			)}
		</>
	);
}
