import {useState} from "react";

export default function SettingItem({oneSetting, handleAddValue}) {
	// const [oneSettingValue, setOneSettingValue] = useState(oneSetting.value);

	// const handleRemoveValue = (e) => {
	// 	setOneSettingValue((prev) =>
	// 		prev.filter((item) => {
	// 			return item !== e.target.value;
	// 		})
	// 	);
	// };

	const clickHandleAddValue = () => {
		const inputValue = document.getElementById(`${oneSetting.id}-input`).value;
		handleAddValue(inputValue, oneSetting.index);
	};

	const oneSettingValueEl = oneSetting.value.map((item) => {
		return (
			<label key={item} className={`${oneSetting.id}-value`}>
				{item}
				<input
					type='checkbox'
					value={item}
					defaultChecked={true}
					// onChange={handleRemoveValue}
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
