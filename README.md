<div align="center">
<img width="1200" height="475" alt="G9 AI Banner" src="C:\SRU\GITHUB CLONES\g9-ai\assets\icon.svg" />
</div>

# G9 AI - VS Code Extension

A luxury VS Code-style AI chat interface featuring a gold and black aesthetic with premium typography and a square input design. Built with React, TypeScript, and powered by Google's Gemini AI.

## Features

- **Premium Design**: Gold and black aesthetic with VS Code-inspired layout
- **Streaming Responses**: Real-time AI response streaming for smooth interactions
- **Markdown Support**: Full markdown rendering with syntax highlighting
- **Code Blocks**: Interactive code blocks with copy functionality
- **Session Management**: Create, rename, and delete chat sessions
- **History Persistence**: Automatically saves sessions to VS Code global state
- **Message Actions**: Copy, regenerate, and refine responses (make shorter/longer)
- **User Prompt Editing**: Edit and resend previous prompts
- **Seamless Integration**: Runs directly in VS Code as a sidebar webview

## Tech Stack

- **React 19.2.3** - UI framework
- **TypeScript** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **@google/genai 1.34.0** - Google Gemini AI SDK
- **react-markdown 9.0.1** - Markdown rendering
- **lucide-react 0.562.0** - Icon library
- **VS Code Extension API** - Native VS Code integration

## Prerequisites

- VS Code (v1.85.0 or higher)
- Node.js (v18 or higher recommended)
- Google Gemini API key

## Installation

### From Source

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd g9-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the extension:
   ```bash
   npm run compile
   ```

4. Start the extension in development mode:
   ```bash
   npm run watch
   ```

5. In VS Code, press `F5` to launch a new Extension Development Host window with the extension loaded.

### From VSIX Package

1. Build the extension:
   ```bash
   npm run vscode:prepublish
   ```

2. Install the `.vsix` file in VS Code:
   - Open VS Code
   - Go to Extensions → Install from VSIX...
   - Select the generated `.vsix` file

## Configuration

### Setting up your API Key

1. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "G9 AI"
3. Enter your Google Gemini API key in the "G9 AI: Api Key" field
4. Optionally, configure the model and max tokens settings

### Configuration Options

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| `g9ai.apiKey` | Your Google Gemini API key | - | - |
| `g9ai.model` | The Gemini model to use | `gemini-1.5-flash` | `gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-1.0-pro` |
| `g9ai.maxTokens` | Maximum tokens for AI responses | `8192` | Any number |

Get your API key from [Google AI Studio](https://ai.google.dev/).

## Usage

### Opening G9 AI

- Click the G9 AI icon in the activity bar (left sidebar)
- Or use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for "Open G9 AI Chat"

### Features

- **New Chat**: Click the `+` button or use the "New Chat" command
- **History**: View and manage previous chat sessions
- **Copy Messages**: Hover over any message to copy its content
- **Regenerate**: Regenerate the last AI response
- **Refine**: Make responses shorter or longer with one click
- **Edit Prompts**: Edit and resend your previous prompts

## Development

### Project Structure

```
g9-ai/
├── src/
│   ├── extension.ts         # Extension entry point
│   ├── G9AIChatProvider.ts  # Webview provider
│   └── utils.ts             # Utility functions
├── webview/                 # React webview app
│   ├── App.tsx             # Main React component
│   ├── index.tsx           # React entry point
│   ├── index.css           # Styles
│   └── index.html          # HTML template
├── components/             # Shared React components
│   └── Icons.tsx           # Lucide icons
├── services/               # AI services
│   └── geminiService.ts    # Gemini API integration
├── types.ts                # TypeScript type definitions
├── assets/                 # Extension icons
├── package.json            # Extension manifest
├── tsconfig.json           # TypeScript config
└── vite.config.webview.ts  # Vite config for webview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile TypeScript to JavaScript |
| `npm run watch` | Watch for changes and recompile |
| `npm run vscode:prepublish` | Prepare for publishing |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

### Building the Webview

The React webview is built separately:

```bash
npm run build
```

This builds the webview to `out/webview/` which is then loaded by the extension.

## Key Components

### Extension Architecture

- **Extension Entry Point** (`extension.ts`): Activates the extension and registers commands
- **Webview Provider** (`G9AIChatProvider.ts`): Manages the chat webview and handles communication
- **React Webview** (`webview/App.tsx`): The chat interface UI

### Message System

- **User Messages**: Displayed with right alignment and gold border
- **Assistant Messages**: Displayed with left alignment and gold border
- **Code Blocks**: Syntax-highlighted with language detection and copy button
- **Timestamps**: Automatic timestamp display for all messages

### Session Management

- **Auto-save**: Sessions automatically saved to VS Code global state
- **History Dialog**: View and manage all previous sessions
- **Session Actions**: Rename or delete sessions with context menu
- **New Session**: Start fresh conversations anytime

### Message Actions

- **Copy**: Copy message content to clipboard
- **Regenerate**: Regenerate the last AI response
- **Make Shorter**: Request a more concise version
- **Make Longer**: Request a more detailed explanation
- **Edit**: Edit and resend user prompts

## Publishing

### Publishing to VS Code Marketplace

1. Install `vsce`:
   ```bash
   npm install -g @vscode/vsce
   ```

2. Package the extension:
   ```bash
   vsce package
   ```

3. Publish:
   ```bash
   vsce publish
   ```

Make sure to update `publisher` in `package.json` with your publisher name.

## Customization

### Styling

The application uses a custom gold and black color scheme. Key colors:
- Primary Gold: `#D4AF37`
- Background Black: `#000000`, `#050505`, `#080808`, `#0A0A0A`
- Text: White and gray variations

### Icons

Icons are sourced from Lucide React and can be customized in `@/components/Icons.tsx`.

## Troubleshooting

### Extension not loading

- Ensure VS Code version is 1.85.0 or higher
- Check the Developer Tools console for errors (`Help → Toggle Developer Tools`)
- Verify all dependencies are installed (`npm install`)

### API key issues

- Make sure your API key is set in VS Code settings
- Verify your API key is valid and has not expired
- Check that you have sufficient quota on Google AI Studio

### Build errors

- Clear the `out` directory and rebuild: `rm -rf out && npm run compile`
- Ensure Node.js version is 18 or higher

## License

This project is private and proprietary.

## Support

For issues or questions, please refer to the project repository or contact the development team.

---

<div align="center">
  <p>Built with ❤️ and premium design for VS Code</p>
</div>
