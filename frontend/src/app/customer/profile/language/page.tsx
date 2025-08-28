"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LanguageSelectionPage() {
  const [selectedLang, setSelectedLang] = useState("id");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-gray-50 border-b">
        <Link href="/customer/profile">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </Link>
        <h1 className="flex-1 text-center text-gray-800 font-semibold">
          Pilihan Bahasa
        </h1>
      </div>

      {/* List Bahasa */}
      <div className="bg-white">
        <button
          onClick={() => setSelectedLang("en")}
          className="w-full flex items-center px-4 py-3 border-b hover:bg-gray-50"
        >
          <Image
            src="/flags/us.png"
            alt="English"
            width={28}
            height={20}
            className="rounded-sm"
          />
          <span className="ml-3 flex-1 text-gray-800">English (EN)</span>
          <span
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
              selectedLang === "en"
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            {selectedLang === "en" && (
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            )}
          </span>
        </button>

        <button
          onClick={() => setSelectedLang("id")}
          className="w-full flex items-center px-4 py-3 hover:bg-gray-50"
        >
          <Image
            src="/flags/id.png"
            alt="Bahasa Indonesia"
            width={28}
            height={20}
            className="rounded-sm"
          />
          <span className="ml-3 flex-1 text-gray-800">
            Bahasa Indonesia (ID)
          </span>
          <span
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
              selectedLang === "id"
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            {selectedLang === "id" && (
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
