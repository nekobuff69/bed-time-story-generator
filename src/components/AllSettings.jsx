import {useState} from "react";
import SettingItem from "./SettingItem";
import {defaultSettings} from "../data/defaultSettings.js";

// State: Manages array of setting objects, each with a value array for customizable options
export default function AllSettings({getStoryContent, sendStoryContent}) {
	const [allSettings, setAllSettings] = useState(defaultSettings);

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

	// Render: Maps each setting to SettingItem component, passing setting data and callback handlers
	const allSettingEl = allSettings.map((oneSettng) => {
		return (
			<SettingItem
				key={oneSettng.id}
				oneSetting={oneSettng}
				handleAddValue={handleAddValue}
				handleRemoveValue={handleRemoveValue}
			/>
		);
	});

	const getAllSettingsData = (formData) => {
		const characterData = formData.getAll("character");
		const moodData = formData.getAll("mood");
		const environmentData = formData.getAll("environment");
		const themeData = formData.getAll("theme");
		const allSettingsData = {
			character: characterData,
			mood: moodData,
			environment: environmentData,
			theme: themeData,
		};

		return allSettingsData;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const settingsData = getAllSettingsData(formData);
		sendStoryContent(""); //Clear the story section before new story generated
		const storyContentMd = await getStoryContent(settingsData);
		sendStoryContent(storyContentMd);
	};

	return (
		<form
			id='settings-form'
			className='settings-container'
			onSubmit={handleSubmit}>
			<h2 className='instruction'>
				Customize your bedtime story experience! Choose from a variety of fun
				settings or add your own by typing and submitting your ideas.
			</h2>
			{allSettingEl}
			<section className='submit-panel'>
				<h1>All set! Let's see what we'll get</h1>
				<button type='submit'>Summon Story</button>
			</section>
		</form>
	);
}
