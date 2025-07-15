import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

// تعريف واجهة الرسالة
interface Message {
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

// تعريف نوع سياق الدردشة
interface ChatbotContextType {
  isChatOpen: boolean;
  messages: Message[];
  toggleChat: () => void;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  connection: signalR.HubConnection | null;
  connectionStatus: string;
}

// إنشاء سياق الدردشة
export const ChatbotContext = createContext<ChatbotContextType>({
  isChatOpen: false,
  messages: [],
  toggleChat: () => {},
  sendMessage: () => {},
  clearMessages: () => {},
  setMessages: () => {},
  connection: null,
  connectionStatus: 'disconnected',
});

// مقدم السياق (Provider)
export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
  const [retryCount, setRetryCount] = useState(0);

  // تهيئة اتصال SignalR مع إعادة المحاولة
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://journeymate.runasp.net/chatHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        logger: signalR.LogLevel.Trace,
        withCredentials: false,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.elapsedMilliseconds < 60000) {
            return 5000; // إعادة المحاولة كل 5 ثواني في الدقيقة الأولى
          }
          return 15000; // ثم إعادة المحاولة كل 15 ثانية
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // معالجات حالة الاتصال
    newConnection.onclose((error) => {
      setConnectionStatus('disconnected');
      console.error('تم إغلاق الاتصال:', error);
      if (error) {
        setTimeout(() => setRetryCount(prev => prev + 1), 5000);
      }
    });

    newConnection.onreconnecting((error) => {
      setConnectionStatus('reconnecting');
      console.log('إعادة الاتصال:', error);
    });

    newConnection.onreconnected((connectionId) => {
      setConnectionStatus('connected');
      console.log('تم إعادة الاتصال بنجاح مع المعرف:', connectionId);
    });

    const startConnection = async () => {
      try {
        setConnectionStatus('connecting');
        await newConnection.start();
        setConnectionStatus('connected');
        console.log('✅ تم الاتصال بـ SignalR بنجاح');
        setConnection(newConnection);
      } catch (err) {
        setConnectionStatus('disconnected');
        console.error('❌ خطأ في الاتصال بـ SignalR:', err);
        if (retryCount < 3) {
          setTimeout(() => setRetryCount(prev => prev + 1), 5000);
        }
      }
    };

    startConnection();

    return () => {
      if (newConnection.state === signalR.HubConnectionState.Connected) {
        newConnection.stop().catch(err => console.error('خطأ في إيقاف الاتصال:', err));
      }
    };
  }, [retryCount]);

  // إعداد مستقبل الرسائل مع معالجة الأخطاء المحسنة
  useEffect(() => {
    if (!connection) return;

    const messageHandler = (sender: string, response: any) => {
      console.log('📩 تم استقبال رسالة من الخادم:', response);

      try {
        // التعامل مع الردود الفارغة أو غير الصالحة
        if (!response || typeof response !== 'object') {
          console.warn('⚠️ تم استقبال رد غير صالح:', response);
          response = { response: '⚠️ لا يوجد رد صالح من البوت.' };
        }

        // حفظ معرف الجلسة إذا وجد
        if (response?.sessionId) {
          localStorage.setItem('chat_session_id', response.sessionId);
        }

        const botMessage: Message = {
          text: response?.response?.trim() || '🤖 لم أفهم ذلك جيدًا. هل يمكنك إعادة الصياغة؟',
          sender: 'bot',
          timestamp: new Date(),
          travels: Array.isArray(response?.travels) ? response.travels : [],
          events: Array.isArray(response?.events) ? response.events : [],
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('❌ خطأ في معالجة الرسالة:', error);
        const errorMessage: Message = {
          text: 'عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    };

    connection.on('ReceiveMessage', messageHandler);

    return () => {
      connection.off('ReceiveMessage', messageHandler);
    };
  }, [connection]);

  // إرسال الرسالة مع معالجة الاتصال المحسنة
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      // التأكد من أن الاتصال قائم قبل الإرسال
      if (!connection || connection.state === signalR.HubConnectionState.Disconnected) {
        setConnectionStatus('connecting');
        console.log('محاولة إعادة الاتصال قبل إرسال الرسالة...');
        await connection?.start();
      }

      await connection?.invoke('SendMessage', text);
    } catch (err) {
      console.error('فشل إرسال الرسالة:', err);
      const errorMessage: Message = {
        text: 'فشل إرسال الرسالة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);

      // محاولة إعادة الاتصال بعد فشل الإرسال
      if (connection && connection.state === signalR.HubConnectionState.Disconnected) {
        try {
          await connection.start();
          setConnectionStatus('connected');
        } catch (reconnectError) {
          setConnectionStatus('disconnected');
          console.error('فشل إعادة الاتصال:', reconnectError);
        }
      }
    }
  }, [connection]);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

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
      connectionStatus,
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};




// import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
// import * as signalR from '@microsoft/signalr';

// interface Message {
//   text: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
//   travels?: any[];
//   events?: any[];
// }

// interface ChatbotContextType {
//   isChatOpen: boolean;
//   messages: Message[];
//   toggleChat: () => void;
//   sendMessage: (text: string) => void;
//   clearMessages: () => void;
//   setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
//   connection: signalR.HubConnection | null;
//   connectionStatus: string;
// }

// export const ChatbotContext = createContext<ChatbotContextType>({
//   isChatOpen: false,
//   messages: [],
//   toggleChat: () => {},
//   sendMessage: () => {},
//   clearMessages: () => {},
//   setMessages: () => {},
//   connection: null,
//   connectionStatus: 'disconnected',
// });

// export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
//   const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
//   const [retryCount, setRetryCount] = useState(0);

//   // Initialize SignalR connection with retry logic
//   useEffect(() => {
//     const newConnection = new signalR.HubConnectionBuilder()
//       .withUrl('https://journeymate.runasp.net/chatHub', {
//         skipNegotiation: true,
//         transport: signalR.HttpTransportType.WebSockets,
//         logger: signalR.LogLevel.Trace,
//         withCredentials: false,
//       })
//       .withAutomaticReconnect({
//         nextRetryDelayInMilliseconds: (retryContext) => {
//           if (retryContext.elapsedMilliseconds < 60000) {
//             return 5000; // Retry every 5 seconds for the first minute
//           }
//           return 15000; // Then retry every 15 seconds
//         },
//       })
//       .configureLogging(signalR.LogLevel.Information)
//       .build();

//     // Connection status handlers
//     newConnection.onclose((error) => {
//       setConnectionStatus('disconnected');
//       console.error('Connection closed:', error);
//       if (error) {
//         // Attempt to reconnect if the connection was dropped unexpectedly
//         setTimeout(() => setRetryCount(prev => prev + 1), 5000);
//       }
//     });

//     newConnection.onreconnecting((error) => {
//       setConnectionStatus('reconnecting');
//       console.log('Connection reconnecting:', error);
//     });

//     newConnection.onreconnected((connectionId) => {
//       setConnectionStatus('connected');
//       console.log('Connection reestablished with ID:', connectionId);
//     });

//     const startConnection = async () => {
//       try {
//         setConnectionStatus('connecting');
//         await newConnection.start();
//         setConnectionStatus('connected');
//         console.log('✅ SignalR Connected');
//         setConnection(newConnection);
//       } catch (err) {
//         setConnectionStatus('disconnected');
//         console.error('❌ SignalR Connection Error:', err);
//         if (retryCount < 3) {
//           setTimeout(() => setRetryCount(prev => prev + 1), 5000);
//         }
//       }
//     };

//     startConnection();

//     return () => {
//       newConnection.stop();
//     };
//   }, [retryCount]);

//   // Set up message receiver with error handling
//   useEffect(() => {
//     if (!connection) return;

//     const messageHandler = (sender: string, response: any) => {
//       try {
//         if (!response) {
//           throw new Error('Empty response received');
//         }

//         if (response?.sessionId) {
//           localStorage.setItem('chat_session_id', response.sessionId);
//         }

//         const botMessage: Message = {
//           text: response?.response || '⚠️ Unexpected response format',
//           sender: 'bot',
//           timestamp: new Date(),
//           travels: response?.travels || [],
//           events: response?.events || [],
//         };

//         setMessages(prev => [...prev, botMessage]);
//       } catch (error) {
//         console.error('Error processing message:', error);
//         const errorMessage: Message = {
//           text: 'Error processing bot response',
//           sender: 'bot',
//           timestamp: new Date(),
//         };
//         setMessages(prev => [...prev, errorMessage]);
//       }
//     };

//     connection.on('ReceiveMessage', messageHandler);

//     return () => {
//       connection.off('ReceiveMessage', messageHandler);
//     };
//   }, [connection]);

//   // Enhanced sendMessage with connection state check
//   const sendMessage = useCallback(async (text: string) => {
//     if (!text.trim()) return;

//     const userMessage: Message = {
//       text,
//       sender: 'user',
//       timestamp: new Date(),
//     };
    
//     setMessages(prev => [...prev, userMessage]);

//     try {
//       if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
//         setConnectionStatus('connecting');
//         console.log('Attempting to reconnect before sending message...');
//         await connection?.start();
//       }

//       await connection?.invoke('SendMessage', text);
//     } catch (err) {
//       console.error('Failed to send message:', err);
//       const errorMessage: Message = {
//         text: 'Failed to send message. Please try again.',
//         sender: 'bot',
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, errorMessage]);

//       // Attempt to reconnect after send failure
//       if (connection) {
//         try {
//           await connection.start();
//           setConnectionStatus('connected');
//         } catch (reconnectError) {
//           setConnectionStatus('disconnected');
//           console.error('Reconnection failed:', reconnectError);
//         }
//       }
//     }
//   }, [connection]);

//   const toggleChat = useCallback(() => {
//     setIsChatOpen(prev => !prev);
//   }, []);

//   const clearMessages = useCallback(() => {
//     setMessages([]);
//   }, []);

//   return (
//     <ChatbotContext.Provider value={{
//       isChatOpen,
//       messages,
//       toggleChat,
//       sendMessage,
//       clearMessages,
//       setMessages,
//       connection,
//       connectionStatus,
//     }}>
//       {children}
//     </ChatbotContext.Provider>
//   );
// };