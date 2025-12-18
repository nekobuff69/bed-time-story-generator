export default function SettingItem({
	oneSetting,
	handleAddValue,
	handleRemoveValue,
	optionLimit,
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
	// The limit of how many options one setting item can get

	return (
		<section className={`${id}-setting-container`}>
			<h3 className='description'>{description}</h3>
			{oneSettingValueEl}
			{value.length < optionLimit && ( // When number of options reach optionLimit, input field disappear
				<input
					className='custom-input'
					id={`${id}-input`}
					type='text'
					name={id}
					defaultValue=''
				/>
			)}
			<button
				id={`btn-add-${id}`}
				className='btn-add-new-value'
				onClick={clickHandleAddValue}
				type='button'
				// When number of options reach optionLimit, button will be disabled.
				// A notice appear to prompt user
				disabled={value.length >= optionLimit ? true : false}>
				{value.length >= optionLimit
					? `Ready to enchant!`
					: `Weave in your magic`}
			</button>
		</section>
	);
}
