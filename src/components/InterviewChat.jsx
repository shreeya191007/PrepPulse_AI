import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Mic, MicOff, Bot, User, Award, Loader2 } from 'lucide-react';
import { useStreamResponse } from '../hooks/useStreamResponse';
import { mockInterviewResponses } from '../data/mockData';

export function InterviewChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your AI technical interviewer today. Let's start: **Can you explain how a hash table handles key collisions under the hood?**"
    }
  ]);
  const [input, setInput] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);
  const [latestMetrics, setLatestMetrics] = useState(null);

  const { streamingText, isStreaming, startStream } = useStreamResponse();

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const mockReply = mockInterviewResponses[Math.floor(Math.random() * mockInterviewResponses.length)];

    startStream(mockReply.text, () => {
      setMessages((prev) => [...prev, { sender: 'ai', text: mockReply.text }]);
      setLatestMetrics(mockReply.metrics);
    });
  };

  return (
    <div className="w-full max-w-full lg:max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-132.5">
      <div className="lg:col-span-2 flex flex-col bg-[#F4EDE8] border border-[#DDD5CD] rounded-2xl overflow-hidden shadow-sm h-112.5 lg:h-full">
        {/* Messages Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#527358] text-white'
                    : 'bg-[#EAE4DD] border border-[#D0C7BC] text-[#805C47]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#527358] text-white rounded-tr-none shadow-xs'
                    : 'bg-[#FBF8F5] border border-[#DDD5CD] text-[#262322] rounded-tl-none shadow-xs'
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {isStreaming && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#EAE4DD] border border-[#D0C7BC] text-[#805C47] shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="max-w-[80%] p-4 rounded-2xl bg-[#FBF8F5] border border-[#DDD5CD] text-[#262322] rounded-tl-none text-xs sm:text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamingText}</ReactMarkdown>
                <span className="inline-block w-2 h-4 bg-[#527358] ml-1 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Audio Waveform Simulator */}
        {isMicActive && (
          <div className="px-4 py-2 bg-[#EBF0EC] border-t border-[#A3B899]/50 flex items-center justify-center gap-1">
            <span className="text-xs text-[#527358] mr-2 font-mono font-bold">Listening...</span>
            {[40, 80, 30, 90, 50, 70, 40].map((height, i) => (
              <div
                key={i}
                className="w-1 bg-[#527358] rounded-full animate-pulse"
                style={{ height: `${height}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {/* Input Controls */}
        <div className="p-3 sm:p-4 bg-[#EAE4DD] border-t border-[#DDD5CD] flex gap-2 items-center">
          <button
            onClick={() => setIsMicActive(!isMicActive)}
            className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
              isMicActive
                ? 'bg-[#FADBD8] border-[#F1948A] text-[#A84343] animate-pulse'
                : 'bg-[#FBF8F5] border-[#D0C7BC] text-[#736C68] hover:text-[#262322]'
            }`}
            aria-label="Toggle microphone input"
          >
            {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your response..."
            className="flex-1 bg-[#FBF8F5] border border-[#DDD5CD] rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-[#262322] placeholder:text-[#9A918B] focus:outline-none focus:border-[#527358] focus:ring-1 focus:ring-[#527358]"
          />

          <button
            onClick={handleSend}
            disabled={isStreaming || !input.trim()}
            className="p-2.5 sm:p-3 bg-[#527358] disabled:opacity-40 hover:bg-[#415D46] active:scale-95 text-white rounded-xl transition-all shadow-xs"
            aria-label="Send message"
          >
            {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Evaluation Side Panel */}
      <div className="bg-[#F4EDE8] border border-[#DDD5CD] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm gap-6 lg:gap-0">
        <div>
          <h3 className="text-base font-bold text-[#262322] flex items-center gap-2 mb-4 lg:mb-6">
            <Award className="w-5 h-5 text-[#9E7B66]" /> Real-time Evaluation
          </h3>

          {latestMetrics ? (
            <div className="space-y-4 sm:space-y-5">
              <MetricBadge label="Clarity & Structure" value={latestMetrics.clarity} color="sage" />
              <MetricBadge label="Technical Depth" value={latestMetrics.technicalDepth} color="brown" />
              <MetricBadge label="Actionability" value={latestMetrics.actionability} color="grey" />
            </div>
          ) : (
            <div className="text-center py-8 lg:py-16 text-[#857E78] text-xs leading-relaxed">
              Complete an interview response turn to unlock live feedback scoring metrics.
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-[#EBF0EC] border border-[#A3B899]/60 text-xs text-[#262322]">
          💡 <span className="font-bold text-[#527358]">Tip:</span> Answers incorporating trade-offs and complexity bounds score higher on Technical Depth.
        </div>
      </div>
    </div>
  );
}

const MetricBadge = ({ label, value, color }) => {
  const colorMap = {
    sage: 'bg-[#527358]',
    brown: 'bg-[#9E7B66]',
    grey: 'bg-[#736C68]'
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-[#615B57]">{label}</span>
        <span className="text-[#262322]">{value}%</span>
      </div>
      <div className="w-full h-2 bg-[#E2DCD4] rounded-full overflow-hidden border border-[#D0C7BC]">
        <div
          className={`h-full ${colorMap[color] || 'bg-[#527358]'} transition-all duration-500 rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};