import { useContext, useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { ChatbotContext } from '../context/ChatbotContext';
import kemetImage from '../assets/images/weeeeeeeeeee.jpg';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  travels?: Array<{
    id: number;
    title: string;
    description?: string;
    imageUrl?: string;
    price?: number;
  }>;
  events?: Array<{
    id: number;
    name: string;
    date: string | Date;
    location?: string;
    description?: string;
  }>;
}

const Chatbot = () => {
  const { 
    isChatOpen, 
    messages, 
    toggleChat, 
    sendMessage,
    setMessages
  } = useContext(ChatbotContext);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        text: "Hi, I am Kemet. I'm here to assist you in exploring Egypt. How can I help you?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isChatOpen, messages.length, setMessages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
   
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message via context (which uses SignalR)
      await sendMessage(inputMessage);
    } catch (error) {
      const errorMessage: ChatMessage = {
        text: 'Sorry, there was an error processing your request. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <button
        onClick={toggleChat}
        className={`w-20 h-20 rounded-full bg-[#DF6951] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 ${
          !isChatOpen ? 'animate-float' : ''
        }`}
        aria-label="Toggle chatbot"
      >
        <img 
          src={kemetImage} 
          alt="Kemet Assistant" 
          className="w-16 h-16 rounded-full object-cover border-2 border-white"
        />
      </button>

      {isChatOpen && (
        <div 
          className="w-[350px] h-[500px] bg-white rounded-t-lg rounded-bl-lg shadow-xl flex flex-col absolute bottom-20 right-0 overflow-hidden"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          {/* Chat header */}
          <div className="bg-[#DF6951] text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <img 
                  src={kemetImage} 
                  alt="Kemet" 
                  className="w-6 h-6 rounded-full object-cover"
                />
              </div>
              <span className="font-semibold">Kemet Assistant</span>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors duration-200"
              aria-label="Close chat"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>

          {/* Chat messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-[#DF6951] text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                  style={{ 
                    borderRadius: message.sender === 'user' 
                      ? '12px 12px 0 12px' 
                      : '12px 12px 12px 0',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Display Travels if available */}
                  {message.travels && message.travels.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-bold mb-2 text-sm">Suggested Travel Packages:</h4>
                      <div className="space-y-2">
                        {message.travels.map((travel) => (
                          <div 
                            key={travel.id} 
                            className="p-2 bg-white bg-opacity-30 rounded-lg"
                          >
                            <div className="font-medium">{travel.title}</div>
                            {travel.description && (
                              <p className="text-xs mt-1">{travel.description}</p>
                            )}
                            {travel.price && (
                              <div className="text-xs mt-1 font-semibold">
                                From ${travel.price.toLocaleString()}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Display Events if available */}
                  {message.events && message.events.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-bold mb-2 text-sm">Upcoming Events:</h4>
                      <div className="space-y-2">
                        {message.events.map((event) => (
                          <div 
                            key={event.id}
                            className="p-2 bg-white bg-opacity-30 rounded-lg"
                          >
                            <div className="font-medium">{event.name}</div>
                            <div className="text-xs mt-1">
                              {formatDate(event.date)}
                              {event.location && ` • ${event.location}`}
                            </div>
                            {event.description && (
                              <p className="text-xs mt-1">{event.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message input area */}
          <div className="border-t border-gray-200 p-3 bg-white flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about Egypt..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#DF6951] focus:border-[#DF6951] transition-colors duration-200"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || inputMessage.trim() === ''}
              className={`px-4 py-3 rounded-r-lg transition-colors duration-200 w-16 flex items-center justify-center ${
                isLoading || inputMessage.trim() === ''
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#DF6951] hover:bg-[#C55A42] text-white'
              }`}
              aria-label="Send message"
            >
              <FaPaperPlane className={`transition-opacity ${isLoading ? 'opacity-50' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;