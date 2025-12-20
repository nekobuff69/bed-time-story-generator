import {systemPrompt} from "../src/data/systemPromptForStoryGen.js";

export const getStoryContent = async (storySettingsData, onChunk) => {
	const {character, mood, environment, theme} = storySettingsData;

	const url = "http://127.0.0.1:1234/v1/chat/completions";
	const model = "openai/gpt-oss-20b";
	// const model = "hermes-4.3-36b";
	// const model = "qwen_qwen3-30b-a3b-thinking-2507";
	// const model = "nvidia/nemotron-3-nano";
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
- Write the story in the same language as the user's input 
- ONLY provide the story written in markdown format. NOTHING ELSE.`;

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
			reasoning: {
				effort: "medium",
			},
			temperature: 1,
			stream: true, // Enable streaming
		}),
	});
	console.log(promptToGenStory);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	let storyContent = "";

	try {
		while (true) {
			const {done, value} = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, {stream: true});
			const lines = buffer.split("\n");
			buffer = lines.pop(); // Keep incomplete line

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					const data = line.slice(6);
					if (data === "[DONE]") return storyContent;

					try {
						const parsed = JSON.parse(data);
						const delta = parsed.choices?.[0]?.delta?.content;
						if (delta) {
							storyContent += delta;
							if (onChunk) onChunk(delta);
						}
					} catch (e) {
						console.error("Error parsing chunk:", e);
					}
				}
			}
		}
	} finally {
		reader.releaseLock();
	}
	return storyContent;
};
