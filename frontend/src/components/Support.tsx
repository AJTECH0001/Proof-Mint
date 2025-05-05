import { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

const Support = () => {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([
    {
      text: 'Hi! I’m your Gadget Expert Assistant. Ask about:\n- Phones 📱 (e.g., "How to reset my iPhone?")\n- Laptops 💻 (e.g., "Best laptop for gaming?")\n- Consoles 🎮 (e.g., "PS5 troubleshooting")\n- Smart Devices 🏠 (e.g., "Set up smart bulb")\n- Recycling ♻ (e.g., "Where to recycle my laptop?")',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Focus input when chat opens
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Sync <details> open state with isOpen
  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = isOpen;
    }
  }, [isOpen]);

  const handleGadgetQuery = async (query: string): Promise<string> => {
    // Mock AI response for production (replace with /api/chat when implemented)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('phone') || lowerQuery.includes('iphone') || lowerQuery.includes('android')) {
      return 'For phone issues, try resetting your device or visiting the manufacturer’s support site. To recycle, check ProofMint’s <a href="/recycling" class="text-blue-500 underline">recycling page</a> for e-waste centers. Can I help with a specific model?';
    } else if (lowerQuery.includes('laptop')) {
      return 'For laptops, ensure your device meets software requirements or check for hardware issues. Recycle via ProofMint’s <a href="/recycling" class="text-blue-500 underline">recycling partners</a>. What’s your laptop issue?';
    } else if (lowerQuery.includes('console') || lowerQuery.includes('ps5') || lowerQuery.includes('xbox')) {
      return 'For gaming consoles, check for firmware updates or contact support. Recycle old consoles via ProofMint’s <a href="/recycling" class="text-blue-500 underline">recycling page</a>. Need help with a specific console?';
    } else if (lowerQuery.includes('smart device') || lowerQuery.includes('bulb') || lowerQuery.includes('thermostat')) {
      return 'Smart devices need Wi-Fi setup. Follow the manufacturer’s app instructions. For recycling, see ProofMint’s <a href="/recycling" class="text-blue-500 underline">e-waste guide</a>. Which device are you using?';
    } else if (lowerQuery.includes('recycle') || lowerQuery.includes('recycling')) {
      return 'Recycle electronics at certified e-waste centers listed on ProofMint’s <a href="/recycling" class="text-blue-500 underline">recycling page</a>. Track your device’s lifecycle in your <a href="/dashboard" class="text-blue-500 underline">dashboard</a> to earn rewards. What are you recycling?';
    }
    return 'I’m here to help with electronics! Could you clarify your question (e.g., device type, recycling)? Or email <a href="mailto:support@proofmint.com" class="text-blue-500 underline">support@proofmint.com</a>.';
  };

  const debouncedSubmit = debounce(async (sanitizedInput: string) => {
    setMessages((prev) => [...prev, { text: sanitizedInput, isUser: true }]);
    setIsLoading(true);
    try {
      const aiResponse = await handleGadgetQuery(sanitizedInput);
      setMessages((prev) => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, I’m having trouble. Please try again or email <a href="mailto:support@proofmint.com" class="text-blue-500 underline">support@proofmint.com</a>.', isUser: false },
      ]);
    }
    setIsLoading(false);
  }, 300);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedInput = DOMPurify.sanitize(input.trim(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    if (!sanitizedInput) return;
    setInput('');
    debouncedSubmit(sanitizedInput);
  };

  const closeChat = () => {
    setIsOpen(false); // Only update state, let useEffect handle <details>
  };

  return (
    <details ref={detailsRef} className="group fixed bottom-8 right-8 z-50">
      <summary className="list-none cursor-pointer">
        <div className="bg-green-600 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all" aria-label="Open Support Chat" onClick={() => setIsOpen(true)}>
          <span className="material-symbols-outlined text-white text-3xl">support_agent</span>
        </div>
      </summary>
      <div
        className={`fixed bottom-16 right-8 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl p-4 transform transition-all duration-200 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Gadget Expert Chat"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 p-2 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-green-600">smart_toy</span>
              <h3 className="font-semibold">Gadget Expert AI</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs bg-green-200 rounded-full">
                {isLoading ? 'Researching...' : 'Online'}
              </span>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={closeChat}
                aria-label="Close Support Chat"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${message.isUser ? 'justify-end' : ''}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.isUser ? 'bg-green-600 text-white rounded-br-none' : 'bg-green-100 rounded-tl-none'
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about phones, laptops, recycling..."
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              disabled={isLoading}
              aria-label="Chat input for gadget questions"
            />
            <button
              type="submit"
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 transition-all disabled:opacity-50"
              disabled={isLoading}
              aria-label="Send message"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </details>
  );
};

export default Support;