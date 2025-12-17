import {useState} from "react";

export default function SettingItem({oneSetting}) {
	const [oneSettingValue, setOneSettingValue] = useState(oneSetting.value);

	const handleAddValue = () => {
		const inputEl = document.getElementById(`${oneSetting.id}-input`);
		const newValue = inputEl.value;
		setOneSettingValue((prev) => [...prev, newValue]);
		inputEl.value = "";
	};

	const handleRemoveValue = (e) => {
		setOneSettingValue((prev) =>
			prev.filter((item) => {
				return item !== e.target.value;
			})
		);
	};

	const oneSettingValueEl = oneSettingValue.map((item) => {
		return (
			<label key={item} className={`${oneSettingValue.id}-value`}>
				{item}
				<input
					type='checkbox'
					value={item}
					defaultChecked={true}
					onChange={handleRemoveValue}
				/>
			</label>
		);
	});

	return (
		<section className={`${oneSetting.id}-setting-container`}>
			<h3 className='description'>{oneSetting.description}</h3>
			{oneSettingValueEl}
			<input
				className='custom-input'
				id={`${oneSetting.id}-input`}
				type='text'
				placeholder={`whatever you feel like`}
				name={oneSetting.id}
				defaultValue=''
			/>
			<button
				className='btn-add-new-value'
				onClick={handleAddValue}
				type='button'>
				Add {oneSetting.id}
			</button>
		</section>
	);
}
