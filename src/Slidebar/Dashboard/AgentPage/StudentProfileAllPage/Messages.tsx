import React, { useState, useRef, useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      sender: "Hansdeep Singh",
      text: "Dear Team, please share alternate email ID also at your earliest",
      time: "12:07 pm",
      unread: true,
      type: "text",
    },
    {
      sender: "Praveen Mathur",
      text: "Kindly share the SOP for St Mary's University, London.",
      time: "12:08 pm",
      unread: true,
      type: "text",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage && !file) return;

    const newMsg = {
      sender: "You",
      text: newMessage,
      file: file ? file.name : null,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      unread: false,
      type: file ? "file" : "text",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setFile(null);
  };

  const unreadCount = messages.filter((msg) => msg.unread).length;

  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col h-[80vh]">

      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-semibold text-[#1a2b4c]">Messages</h2>
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
          {unreadCount} Unread
        </span>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md p-4 rounded-xl shadow-sm ${
                msg.sender === "You"
                  ? "bg-blue-900 text-white"
                  : "bg-white"
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {msg.sender}
              </p>

              {msg.type === "text" && (
                <p className="text-sm">{msg.text}</p>
              )}

              {msg.type === "file" && (
                <div className="bg-white/20 p-2 rounded mt-1 text-sm">
                  📎 {msg.file}
                </div>
              )}

              <p className="text-xs mt-2 opacity-70 text-right">
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-3">

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="fileUpload"
          />

          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md text-sm hover:bg-gray-200"
          >
            📎 File
          </label>

          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
          />

          <button
            onClick={handleSend}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Send
          </button>
        </div>

        {file && (
          <div className="text-xs mt-2 text-gray-500">
            Selected: {file.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;