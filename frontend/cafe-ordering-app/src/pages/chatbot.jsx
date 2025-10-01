import { SendHorizontal } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const api = import.meta.env.VITE_API_URL;

const ChatBot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const savedMessages = JSON.parse(sessionStorage.getItem('warnaBee_Chat'))
    if (savedMessages) {
      setmessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('warnaBee_Chat', JSON.stringify(messages));
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
      const res = await axios.post(`${api}/chatbot/chat`, {question})

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
        <div ref={chatContainerRef} className='border-t-2 border-b-2 border-gray-300 h-full overflow-auto p-2 bg-gray-200 flex flex-col gap-4'>
          { messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Mulai percakapan dengan WarnaBee...
            </div>
           ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[75%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'ml-auto bg-green-600 text-white' 
                    : 'mr-auto bg-white text-gray-800'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown 
                      components={{
                        // Override paragraph styling to avoid margin issues
                        p: (props) => <p className="my-1" {...props} />,
                        // Ensure links open in new tab
                        a: (props) => <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
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