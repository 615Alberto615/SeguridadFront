import { useState, useEffect } from 'react';
import { FaComment, FaTimes } from 'react-icons/fa';
import { useChatStore } from '../store/chatStore';

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, sendChatMessage, startSession, sessionId } = useChatStore();
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const statusLoggin = localStorage.getItem('isLoggedIn') === 'true';

    // Cargar sessionId desde localStorage cuando el componente se monta
    useEffect(() => {
        const savedSessionId = localStorage.getItem('chatSessionId');
        if (savedSessionId) {
            startSession(savedSessionId);  // Inicia la sesión con la sessionId guardada
        }
    }, [startSession]);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
        if (!isOpen && !sessionId) {
            startSession();  // Solo iniciar una nueva sesión si no hay una guardada
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            setIsLoading(true);
            await sendChatMessage(inputMessage);
            setInputMessage('');
            setIsLoading(false);  // Desactivar el indicador de carga una vez recibida la respuesta
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const LoadingIndicator = () => (
        <div className="flex justify-start space-x-2 ml-2">
            <div className="animate-pulse h-2 w-2 bg-gray-400 rounded-full"></div>
            <div className="animate-pulse h-2 w-2 bg-gray-400 rounded-full"></div>
            <div className="animate-pulse h-2 w-2 bg-gray-400 rounded-full"></div>
        </div>
    );

    if (!statusLoggin) {
        return null; // No renderiza el componente si el usuario no está logeado
    }

    return (
        <div className={`fixed bottom-4 right-4 ${isOpen ? 'w-96 h-96' : 'w-12 h-12'} bg-gradient-to-br from-indigo-600 to-blue-800 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ease-in-out`} onClick={!isOpen ? toggleChatBox : undefined}>
            {!isOpen ? (
                <FaComment className="text-white text-3xl" />
            ) : (
                <div className="w-full h-full flex flex-col bg-gradient-to-br from-purple-500 via-purple-600 to-blue-800 text-white rounded-lg shadow-xl relative">
                    <button onClick={toggleChatBox} className="absolute top-3 right-3 text-lg text-white z-10 flex items-center">
                        <FaTimes className="text-2xl" />
                    </button>
                    <div className="p-2 flex justify-between items-center">
                        <span className="font-bold">En qué te puedo ayudar</span>
                    </div>
                    <ul className="flex-1 overflow-y-auto p-2 space-y-2">
                        {messages.map((msg, index) => (
                            <li key={index} className={`flex items-start ${msg.sender === 'self' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 text-sm rounded-lg ${msg.sender === 'self' ? 'bg-indigo-400' : 'bg-white'} ${msg.sender === 'self' ? 'text-white' : 'text-purple-800'} break-words max-w-[70%]`}>
                                    {msg.text}
                                </div>
                            </li>
                        ))}
                        {isLoading && <LoadingIndicator />}
                    </ul>
                    <div className="p-2 flex">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-lg bg-white text-gray-800"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu consulta aqui..."
                        />
                        <button onClick={handleSendMessage} className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
