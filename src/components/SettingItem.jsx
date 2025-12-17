import {useState} from "react";

export default function SettingItem({
	oneSetting,
	handleAddValue,
	handleRemoveValue,
}) {
	const clickHandleRemoveValue = (e) => {
		const valueToRemove = e.target.value;
		console.log(`valueToRemove: ${valueToRemove}`);
		handleRemoveValue(valueToRemove, oneSetting.index);
	};

	const clickHandleAddValue = () => {
		const inputEl = document.getElementById(`${oneSetting.id}-input`);
		const inputValue = inputEl.value;
		handleAddValue(inputValue, oneSetting.index);
		inputEl.value = "";
	};

	const oneSettingValueEl = oneSetting.value.map((item) => {
		return (
			<label key={item} className={`${oneSetting.id}-value`}>
				{item}
				<input
					type='checkbox'
					value={item}
					defaultChecked={true}
					onChange={clickHandleRemoveValue}
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
				onClick={clickHandleAddValue}
				type='button'>
				Add {oneSetting.id}
			</button>
		</section>
	);
}
