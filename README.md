# The Enchanted Story Weaver

A magical bedtime story generator built with React and Vite, designed to create personalized fairy tales for children.

## Features

- **Interactive Story Builder**: Choose characters, moods, environments, and themes to create unique stories
- **AI-Powered Story Generation**: Uses local AI models to generate engaging bedtime stories
- **Real-time Streaming**: Stories are generated and displayed in real-time as they're created
- **Markdown Rendering**: Beautifully formatted stories with support for rich text formatting
- **Customizable Settings**: Add or remove story elements to tailor each tale
- **Replay Functionality**: Generate new stories with different combinations of settings

## Tech Stack

- **Frontend**: React 19.2.0 with Vite 7.2.4
- **Build Tool**: Vite with React Compiler enabled
- **Markdown Rendering**: react-markdown with GitHub Flavored Markdown support
- **AI Integration**: Local AI model communication via HTTP API

## Project Structure

```
bed-time-story-generator/
├── src/
│   ├── components/
│   │   ├── AllSettings.jsx      # Main settings form and story generation
│   │   ├── Header.jsx           # Application header
│   │   ├── SettingItem.jsx      # Individual setting configuration
│   │   ├── StorySection.jsx     # Story display with markdown rendering
│   │   ├── submitPanel.jsx      # Form submission controls
│   │   └── ReplayPanel.jsx      # Story replay and reset controls
│   ├── data/
│   │   ├── defaultSettings.js   # Default story settings
│   │   └── systemPrompt.js      # AI system prompt for story generation
│   └── App.jsx                  # Main application component
├── utils/
│   └── getAiResponse.js         # AI communication and streaming logic
└── README.md                    # This file
```

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Usage

1. Open the application in your browser
2. Select or customize your story settings:
   - **Characters**: Choose your tale's heroes
   - **Mood**: Set the adventure's heartbeat
   - **Environment**: Discover a realm of wonder
   - **Theme**: Uncover the story's secret spark
3. Click "Generate Story" to create your personalized bedtime tale
4. Enjoy the streaming story display with beautiful markdown formatting

## AI Configuration

The application connects to a local AI server running on `http://127.0.0.1:1234`. Currently configured to use the `openai/gpt-oss-20b` model, but can be easily switched to other models by modifying the model variable in [`utils/getAiResponse.js`](utils/getAiResponse.js:8).

## Development Notes

- The React Compiler is enabled for enhanced performance
- ESLint is configured for code quality and React best practices
- The application uses modern React patterns with hooks for state management
- Streaming responses are handled efficiently to provide real-time updates

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
