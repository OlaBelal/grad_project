import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  travels?: any[];
  events?: any[];
}

interface ChatbotContextType {
  isChatOpen: boolean;
  messages: Message[];
  toggleChat: () => void;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  connection: signalR.HubConnection | null;
}

export const ChatbotContext = createContext<ChatbotContextType>({
  isChatOpen: false,
  messages: [],
  toggleChat: () => {},
  sendMessage: () => {},
  clearMessages: () => {},
  setMessages: () => {},
  connection: null,
});

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  // Initialize SignalR connection
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://journeymate.runasp.net/chatHub')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error:', err));

    return () => {
      newConnection.stop();
    };
  }, []);

  // Set up message receiver
  useEffect(() => {
    if (!connection) return;

    connection.on('ReceiveMessage', (sender: string, response: any) => {
      const botMessage: Message = {
        text: response.response || '',
        sender: 'bot',
        timestamp: new Date(),
        travels: response.travels,
        events: response.events
      };
      setMessages(prev => [...prev, botMessage]);
    });

    return () => {
      connection.off('ReceiveMessage');
    };
  }, [connection]);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !connection) return;
    
    const userMessage: Message = {
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      await connection.invoke('SendMessage', text);
    } catch (err) {
      const errorMessage: Message = {
        text: 'There was a problem talking to the assistant. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [connection]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatbotContext.Provider value={{
      isChatOpen,
      messages,
      toggleChat,
      sendMessage,
      clearMessages,
      setMessages,
      connection,
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};