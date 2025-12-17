export const getStoryContent = async (storySettingsData) => {
	const {character, mood, environment, theme} = storySettingsData;

	const url = "http://127.0.0.1:1234/v1/chat/completions";
	const model = "openai/gpt-oss-20b";
	const systemPrompt =
		"Super creative writer. Provided any materials, you can convert them into astonishing writtings.";
	const promptToGenStory = `Write a bedtime story based on materials provided below: 
    ~~~
    - Characters: ${character}
    - Mood: ${mood}
    - Environment: ${environment}
    - Themem: ${theme}
    ~~~
    Requriments:
    - 1. ALL elements must be blend into the narrative naturally
    - 2. The story should be at most 200 words
    - 3. ONLY output the story written in markdown format`;

	console.log(`\n****PROCESSING****`);
	console.log(`Submitted prompt: ${promptToGenStory}`);
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
				effort: "low",
			},
		}),
	});

	const data = await response.json();
	const storyContent = data.choices[0].message.content;
	console.log(`\n****STORY CONTENT****\n${storyContent}`);
	console.log(`\n****END OF STORY****`);
	return storyContent;
};
