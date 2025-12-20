import {systemPromptForIllustrationGen} from "../src/data/systemPromptForIllustrationGen.js";
export default async function getIllustrationPrompt(storyContent) {
	const url = "http://127.0.0.1:1234/v1/chat/completions";
	const model = "openai/gpt-oss-20b";
	const promptToGenImage = `Write image generation prompt(30-80 words) for this story: ~~~~${storyContent}~~~
	If story is not provided or empty, you must output a prompt to generate a warning sign "Story Missing"`;

	const data = await fetch(url, {
		headers: {"Content-Type": "application/json"},
		method: "POST",
		body: JSON.stringify({
			model: model,
			messages: [
				{role: "system", content: systemPromptForIllustrationGen},
				{role: "user", content: promptToGenImage},
			],
			reasoning: {
				effort: "medium",
			},
		}),
	});
	console.log("illustratioin prompt generating");
	const response = await data.json();
	const illustrationPrompt = response.choices[0].message.content;

	console.log(`illustration prompt generated: ${illustrationPrompt}`);

	return illustrationPrompt;
}
