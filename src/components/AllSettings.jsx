import {useState} from "react";
import SettingItem from "./SettingItem";
import {defaultSettings} from "./defaultSettings.js";

export default function AllSettings() {
	const [allSettings, setAllSettings] = useState(defaultSettings);
	// console.log(`Initial Settings:${defaultSettings}`);
	// const addSettingValue = () => {
	//     const newValue

	// }

	const allSettingEl = allSettings.map((item) => {
		return (
			<SettingItem
				key={item.id}
				oneSetting={item}
				// addSettingValue={addSettingValue}
			/>
		);
	});

	return (
		<form className='settings-container'>
			<h2 className='instruction'>
				Customize your bedtime story experience! Choose from a variety of fun
				settings or add your own by typing and submitting your ideas.
			</h2>
			{allSettingEl}
		</form>
	);
}
