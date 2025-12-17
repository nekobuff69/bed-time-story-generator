export default function SettingItem({
	oneSetting,
	handleAddValue,
	handleRemoveValue,
}) {
	// Event handler: Extracts value from checkbox event, calls parent remove handler with value and setting index
	const clickHandleRemoveValue = (e) => {
		const valueToRemove = e.target.value;
		console.log(`valueToRemove: ${valueToRemove}`);
		handleRemoveValue(valueToRemove, oneSetting.index);
	};

	// Event handler: Gets input value, calls parent add handler, clears input
	const clickHandleAddValue = () => {
		const inputEl = document.getElementById(`${oneSetting.id}-input`);
		const inputValue = inputEl.value;
		handleAddValue(inputValue, oneSetting.index);
		inputEl.value = "";
	};

	// Render: Maps each value in setting to a checkbox label.
	//Default state is checked, if clicked to unchecked, it will be removed
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
