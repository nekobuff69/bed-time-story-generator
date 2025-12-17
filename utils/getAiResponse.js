import {systemPrompt} from "../src/data/systemPrompt.js";
export const getStoryContent = async (storySettingsData) => {
	const {character, mood, environment, theme} = storySettingsData;

	const url = "http://127.0.0.1:1234/v1/chat/completions";
	// const model = "openai/gpt-oss-20b";
	// const model = "hermes-4.3-36b";
	const model = "qwen_qwen3-30b-a3b-thinking-2507";
	const promptToGenStory = `User input provided below: 
~~~
- Characters: ${character}
- Mood: ${mood}
- Environment: ${environment}
- Themem: ${theme}
~~~

FINAL OUTPUT REQUIRMENTS:
- The story should be at most 250 words
- Add at emojis to high-light important descriptions, if needed. DO NOT ovreuse it.
- ONLY provide the story written in markdown format. NOTHING ELSE.`;

	console.log(`\n****PROCESSING****`);
	console.log(`systemPrompt: ${systemPrompt}`);
	console.log(`prompt: ${promptToGenStory}`);
	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			model: model,
			messages: [
				{role: "system", content: systemPrompt},
				{role: "user", content: promptToGenStory},
			],
			// reasoning: {
			// 	effort: "high",
			// },
		}),
	});

	const data = await response.json();
	const storyContent = data.choices[0].message.content;
	console.log(`\n****STORY CONTENT****\n${storyContent}`);
	console.log(`\n****END OF STORY****`);
	return storyContent;
};
