import {useState} from "react";
import SettingItem from "./SettingItem";
import {defaultSettings} from "./defaultSettings.js";

export default function AllSettings() {
	const [allSettings, setAllSettings] = useState(defaultSettings);

	const handleAddValue = (targetInputValue, oneSettingIndex) => {
		setAllSettings((prev) =>
			prev.map((oneSettingItem) => {
				if (prev.indexOf(oneSettingItem) === oneSettingIndex) {
					const newValue = [...oneSettingItem.value, targetInputValue];
					return {
						...oneSettingItem,
						value: newValue,
					};
				} else {
					return oneSettingItem;
				}
			})
		);
	};

	const allSettingEl = allSettings.map((item) => {
		return (
			<SettingItem
				key={item.id}
				oneSetting={item}
				handleAddValue={handleAddValue}
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
