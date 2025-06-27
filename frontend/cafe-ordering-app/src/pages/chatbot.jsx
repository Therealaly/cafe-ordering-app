import { SendHorizontal } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container when messages updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  //load chat history from localStorage when component mounts
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('warnaBee_Chat'))
    if (savedMessages) {
      setmessages(savedMessages);
    }
  }, []);

  // save chat history to localStorage whenever messages changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('warnaBee_Chat', JSON.stringify(messages));
    }
  }, [messages]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userQuestion = {
      text: question, role: 'user'
    }
    setmessages(prev => [...prev, userQuestion]);

    setQuestion('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot/chat', {question})

      const botmessages = {
        text: res.data.answer,
        role: 'bot'
      };

      setmessages(prev => [...prev, botmessages]);
    } catch (error) {
      console.error('Error fetching messages:', error);
      const errormessages = {
        text: 'Maaf, terjadi kesalahan saat mendapatkan jawaban. Silakan coba lagi.',
        role: 'bot'
      };
      setmessages(prev => [...prev, errormessages]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 max-w-full h-screen flex flex-col pb-15">
      <div className="flex flex-col h-full bg-white">
        <div className="flex flex-col items-center justify-center w-full max-h-fit p-4 gap-2">
          <h1 className='text-xl font-semibold text-black'>WarnaBee &#x1F916;</h1>
          <p className="text-sm font-light text-center text-gray-800">Halo, saya WarnaBee! asisten virtual yang siap menjawab pertanyaan seputar Warna Kopi &#x1F600;</p>
        </div>
        <div ref={chatContainerRef} className='border-t-2 border-b-2 border-gray-300 h-full overflow-auto p-2 bg-gray-200 flex flex-col gap-2'>
          { messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Mulai percakapan dengan WarnaBee...
            </div>
           ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[75%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'ml-auto bg-green-600 text-white' 
                    : 'mr-auto bg-white text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            ))
          )}
          
          {loading && (
            <div className="mr-auto bg-white text-gray-800 max-w-[75%] p-3 rounded-lg flex items-center">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row max-h-fit bg-white p-2 rounded-lg shadow-lg align-middle items-center gap-2 pb-7">
          <textarea
            rows={1}
            type="text"
            placeholder="Tanya WarnaBee..."
            className="field-sizing-content w-5/6 p-2 border border-gray-700 focus:outline-none focus:border-green-900 rounded-lg text-gray-900 resize-none min-h-[40px] max-h-[100px] overflow-y-auto"
            value={question}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAsk();
              }
            }}
          />
          <button 
            className='flex items-center justify-center rounded-lg border border-green-900 w-1/6 h-full p-2 min-h-[40px]'
            onClick={handleAsk}
            disabled={loading || !question.trim()}>
            <SendHorizontal className={`${loading || !question.trim() ? 'text-gray-400' : 'text-green-900'}`} size={24} />
          </button>
        </div>
      </div>
    </div>
  ) 
}

export default ChatBot;