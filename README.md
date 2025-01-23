# AI Financial Advisor Chat

A modern, interactive financial advisor chatbot powered by Groq's LLM API. Get personalized financial advice, investment strategies, and budgeting tips through a sleek, user-friendly interface.

![Financial Advisor Chat](https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200)

## Features

- 💬 Real-time chat interface
- 🎯 Personalized financial advice
- 🎤 Voice input support
- 💻 Responsive design
- ⚡ Fast responses powered by Groq's Mixtral model
- 🔒 Environment variable support for API key security

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)
- A Groq API key (get one at [Groq's website](https://groq.com))

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yash-0300/Financial-Chatbot
   cd ai-financial-advisor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   VITE_GROQ_API_KEY=your-groq-api-key
   ```
   Replace `your-groq-api-key` with your actual Groq API key.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Type your financial question in the input field or use the microphone button for voice input
2. Press Enter or click the Send button to get a response
3. The AI will provide personalized financial advice based on your query
4. Continue the conversation to get more detailed information

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Groq API
- Lucide React Icons
- Web Speech API for voice input

## Project Structure

```
src/
├── components/        # React components
│   ├── ChatInput.tsx    # Input component with voice support
│   └── ChatMessage.tsx  # Message display component
├── lib/              # Utility functions
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Development

To run the development server with hot reload:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Groq for providing the LLM API
- Lucide for the beautiful icons
- Tailwind CSS for the styling system
