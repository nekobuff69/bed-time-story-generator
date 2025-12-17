export default function SettingItem({
	oneSetting,
	handleAddValue,
	handleRemoveValue,
}) {
	//Destructure keys form oneSetting object for cleaner codes below
	const {index, id, description, value} = oneSetting;

	// Event handler: Extracts value from checkbox event, calls parent remove handler with value and setting index
	const clickHandleRemoveValue = (e) => {
		const valueToRemove = e.target.value;
		console.log(`valueToRemove: ${valueToRemove}`);
		handleRemoveValue(valueToRemove, index);
	};

	// Event handler: Gets input value, calls parent add handler, clears input
	const clickHandleAddValue = () => {
		const inputEl = document.getElementById(`${id}-input`);
		const inputValue = inputEl.value;
		handleAddValue(inputValue, index);
		inputEl.value = "";
	};

	// Render: Maps each value in setting to a checkbox label.
	//Default state is checked, if clicked to unchecked, it will be removed
	const oneSettingValueEl = value.map((oneOption) => {
		return (
			<label key={oneOption} className={`${id}-value`}>
				{oneOption}
				<input
					type='checkbox'
					value={oneOption}
					defaultChecked={true}
					name={id}
					onChange={clickHandleRemoveValue}
				/>
			</label>
		);
	});

	return (
		<section className={`${id}-setting-container`}>
			<h3 className='description'>{description}</h3>
			{oneSettingValueEl}
			<input
				className='custom-input'
				id={`${id}-input`}
				type='text'
				placeholder={`whatever you feel like`}
				name={id}
				defaultValue=''
			/>
			<button
				className='btn-add-new-value'
				onClick={clickHandleAddValue}
				type='button'>
				Add {id}
			</button>
		</section>
	);
}
