import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  isLoading?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, isLoading }) => {
  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg',
        isBot ? 'bg-gray-50' : 'bg-white'
      )}
    >
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </div>
      <div className="flex-1">
        {isLoading ? (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : (
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{message}</p>
        )}
      </div>
    </div>
  );
};