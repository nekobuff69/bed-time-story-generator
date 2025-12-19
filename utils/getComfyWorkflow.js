// import {comfyWorkflowTemplate} from "../src/data/comfyWorkflowTemplate.js";
export default function getComfyWorkflow(
	illustrationPrompt,
	comfyWorkflowTemplate
) {
	// Need to use different each time, or ComfyUI will not re-generate image for same prompt
	const randomSeed = Math.floor(Math.random() * 999999999999);
	const customizedWorkFlow = {
		...comfyWorkflowTemplate,
		3: {
			...comfyWorkflowTemplate[3],
			inputs: {
				...comfyWorkflowTemplate[3].inputs,
				seed: randomSeed,
			},
		},
		6: {
			...comfyWorkflowTemplate[6],
			inputs: {
				...comfyWorkflowTemplate[6].inputs,
				text: illustrationPrompt,
			},
		},
	};
	console.log(customizedWorkFlow);
	return customizedWorkFlow;
}
