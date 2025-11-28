// src/components/ChatBot.jsx
import { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Mình là trợ lý mua sắm đây. Bạn đang tìm sản phẩm nào hôm nay?" }
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ================== LOCALSTORAGE - F5 KHÔNG MẤT CHAT ==================
  useEffect(() => {
    const saved = localStorage.getItem("kh3t_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 1 || (parsed.length === 1 && parsed[0].sender === "user")) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error("Lỗi parse chat history:", e);
      }
    }
  }, []);

  useEffect(() => {
    const hasRealMessage = messages.length > 1 || 
      (messages.length === 1 && messages[0].sender === "user");
    if (hasRealMessage) {
      localStorage.setItem("kh3t_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("kh3t_chat_history");
      setMessages([
        { sender: "bot", text: "Xin chào! Mình là trợ lý mua sắm đây. Bạn đang tìm sản phẩm nào hôm nay?" }
      ]);
    };
    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);
  // ====================================================================

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatLoading]);

  const sendMessage = async () => {
    if (!input.trim() || chatLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setChatLoading(true);

    try {
      const res = await fetch("http://localhost:8080/chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const text = await res.text();
      setMessages(prev => [...prev, {
        sender: "bot",
        text: text || "Dạ em chưa hiểu lắm, anh/chị nói lại giúp em nha!"
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "Oops! Có lỗi kết nối rồi, thử lại sau ít phút nhé!"
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Nút nổi góc dưới phải */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed right-6 bottom-6 z-50 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110"
      >
        {chatOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Cửa sổ chat */}
      {chatOpen && (
        <div className="fixed right-6 bottom-24 z-50 w-96 h-120 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPJteM29wDFaITjbx1jOkFsIPRa6JKw-508w&s"
                  alt="Trợ lý"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">Trợ lý mua sắm</h3>
                <p className="text-xs opacity-90">Luôn online • Hỗ trợ 24/7</p>
              </div>
            </div>
          </div>

          {/* Tin nhắn */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-red-500 text-white rounded-tr-none"
                      : "bg-white text-gray-800 shadow rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl shadow rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
                disabled={chatLoading}
              />
              <button
                onClick={sendMessage}
                disabled={chatLoading || !input.trim()}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;