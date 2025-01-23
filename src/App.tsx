import React, { useState, useRef, useEffect } from 'react';
import { Groq } from 'groq-sdk';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { CircleDollarSign } from 'lucide-react';

interface Message {
  content: string;
  isBot: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your personal financial advisor. I can help you with investment strategies, budgeting, and financial planning. What would you like to know?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      setMessages((prev) => [
        ...prev,
        { content: message, isBot: false },
        { content: 'Error: Groq API key is not configured. Please check your .env file.', isBot: true }
      ]);
      return;
    }

    setMessages((prev) => [...prev, { content: message, isBot: false }]);
    setIsLoading(true);
    

    try {
      const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const chatHistory = messages.map(msg => ({
        role: msg.isBot ? 'assistant' as const : 'user' as const,
        content: msg.content
      }));

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert financial advisor. Provide clear, accurate, and personalized financial advice. Focus on practical solutions and explain complex concepts in simple terms. Always maintain professionalism and consider risk management in your advice.',
          },
          ...chatHistory,
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 1024
      });

      if (!completion.choices[0]?.message?.content) {
        throw new Error('No response content received from Groq API');
      }

      const response = completion.choices[0]?.message?.content;
      setMessages((prev) => [...prev, { content: response, isBot: true }]);
    } catch (error) {
      console.error('Groq API Error:', error);
      
      let errorMessage = 'An error occurred while processing your request. ';
      
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          errorMessage += 'Please check if your Groq API key is valid.';
        } else if (error.message.includes('429')) {
          errorMessage += 'Rate limit exceeded. Please try again later.';
        } else {
          errorMessage += error.message;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          content: errorMessage,
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
        <div className="flex items-center justify-center gap-2 py-4">
          <CircleDollarSign className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Financial Advisor AI</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isBot={message.isBot}
            />
          ))}
          {isLoading && (
            <ChatMessage
              message=""
              isBot={true}
              isLoading={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 bg-gray-100 pt-4">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;