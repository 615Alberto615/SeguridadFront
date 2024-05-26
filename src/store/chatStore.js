// chatStore.js
import create from 'zustand';
import { startChatSession, sendMessage, fetchChatHistory } from '../service/chatService';

const useChatStore = create((set, get) => ({
    messages: [],
    sessionId: null,

    startSession: async () => {
        try {
            const data = await startChatSession();
            set({ sessionId: data.sessionId, messages: [...get().messages, { text: data.response, sender: 'bot' }] });
        } catch (error) {
            console.error('Failed to start chat session:', error);
        }
    },

    sendChatMessage: async (message) => {
        const { sessionId } = get();
        if (sessionId && message.trim()) {
            // Agrega el mensaje enviado inmediatamente al estado
            set(state => ({ messages: [...state.messages, { text: message, sender: 'self' }] }));
            try {
                const response = await sendMessage(sessionId, message);
                // Agrega la respuesta del servidor al estado cuando llega
                set(state => ({ messages: [...state.messages, { text: response.response, sender: 'bot' }] }));
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    },

    getChatHistory: async () => {
        try {
            const { sessionId } = get();
            if (sessionId) {
                const { messages } = await fetchChatHistory(sessionId);
                set({ messages: messages.map(msg => ({ ...msg, sender: msg.sender === 'self' ? 'self' : 'bot' })) });
            }
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        }
    }
}));

export { useChatStore };
