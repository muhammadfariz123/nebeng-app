"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Search, ArrowLeft, Phone, ImageIcon } from "lucide-react";

type ChatMessage = {
  sender: string;
  text?: string | null;
  image?: string | null;
  time: string;
};

type Chat = {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  type: string;
  unread: number;
  history: ChatMessage[];
};

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialChats: Chat[] = [
    {
      id: "1",
      name: "Driver",
      message: "Baik Mba",
      time: "Now",
      avatar: "/driver1.png",
      type: "car",
      unread: 1,
      history: [
        { sender: "driver", text: "Baik. Titik jemput sesuai pos, ya?", time: "10.23 AM" },
        { sender: "me", text: "iyaa", time: "10.23 AM" },
        { sender: "driver", text: "Baik mba saya otw kesitu tapi maaf kalau agak telat ya mba, soalnya lumayan macet", time: "10.23 AM" },
        { sender: "me", text: "iyaa pak, gapapa", time: "10.23 AM" },
        { sender: "driver", text: "Baik Mba", time: "10.23 AM" },
      ],
    },
    {
      id: "2",
      name: "Driver",
      message: "Baik Mba",
      time: "Kemarin",
      avatar: "/driver2.png",
      type: "home",
      unread: 0,
      history: [
        { sender: "driver", text: "Halo mba, saya sudah sampai", time: "10.00 AM" },
        { sender: "me", text: "Oke pak, saya keluar", time: "10.01 AM" },
      ],
    },
  ];

  const [chatData, setChatData] = useState<Chat[]>(initialChats);

  const handleSendMessage = () => {
    if ((!message.trim() && !imagePreview) || !selectedChat) return;

    const newMessage: ChatMessage = {
      sender: "me",
      text: message.trim() || null,
      image: imagePreview || null,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Update chatData
    setChatData(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, history: [...chat.history, newMessage] }
          : chat
      )
    );

    // Update selectedChat
    setSelectedChat(prev =>
      prev ? { ...prev, history: [...prev.history, newMessage] } : null
    );

    setMessage("");
    setImagePreview(null);

    // Bot auto-reply
    setTimeout(() => {
      const botReply: ChatMessage = {
        sender: "driver",
        text: "Oke, saya mengerti 👍",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatData(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id
            ? { ...chat, history: [...chat.history, botReply] }
            : chat
        )
      );

      setSelectedChat(prev =>
        prev ? { ...prev, history: [...prev.history, botReply] } : null
      );
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {selectedChat ? (
        <>
          {/* Header Chat */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <button onClick={() => setSelectedChat(null)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <Image
              src={selectedChat.avatar}
              alt={selectedChat.name}
              width={40}
              height={40}
              className="rounded-full ml-3"
            />
            <div className="ml-3 flex-1">
              <p className="font-semibold">{selectedChat.name}</p>
              <p className="text-sm text-gray-500">AB1448AS</p>
            </div>
            <Phone className="w-5 h-5 text-blue-500" />
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.history.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text && <p>{msg.text}</p>}
                  {msg.image && (
                    <Image
                      src={msg.image}
                      alt="Sent"
                      width={150}
                      height={150}
                      className="rounded-lg mt-1"
                    />
                  )}
                  <div className="text-[10px] mt-1 opacity-70">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="p-2 flex items-center justify-between bg-gray-100">
              <div className="flex items-center gap-2">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={50}
                  height={50}
                  className="rounded"
                />
                <span className="text-sm text-gray-500">Gambar siap dikirim</span>
              </div>
              <button onClick={() => setImagePreview(null)} className="text-red-500 text-sm">
                Hapus
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 border-t border-gray-200 flex items-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-500 text-xl mr-2"
            >
              <ImageIcon />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kirim pesan ke driver"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 rounded-full p-2"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.94 2.94a.75.75 0 011.06 0L17 15.94a.75.75 0 11-1.06 1.06L2.94 4a.75.75 0 010-1.06z" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Header List */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold">Chat</h1>
          </div>

          {/* Search */}
          <div className="px-4 py-2">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari"
                className="flex-1 bg-transparent outline-none ml-2 text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chatData.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="flex items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="relative">
                  <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full text-[10px]">
                    {chat.type === "car" ? "🚗" : "🏠"}
                  </span>
                </div>
                <div className="flex-1 ml-3">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{chat.name}</p>
                    <span className="text-xs text-blue-500">{chat.time}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{chat.message}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
