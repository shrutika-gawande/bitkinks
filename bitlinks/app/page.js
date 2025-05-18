"use client";
import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShort, setCustomShort] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortened, setIsShortened] = useState(false);

  const handleShorten = async () => {
    if (!originalUrl) return;

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: originalUrl,
        shorturl: customShort || undefined,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
      setIsShortened(true);
    } else {
      alert(data.message || "Failed to shorten URL");
    }
  };

  const handleReset = () => {
    setOriginalUrl("");
    setCustomShort("");
    setShortUrl("");
    setIsShortened(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-6 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        Shorten. <span className="text-blue-500">Share.</span> Track.

        <p className="text-gray-400 font-normal mt-3 text-sm sm:text-l">
          Create short, beautiful, and trackable URLs for your links — fast, reliable, and secure.
        </p>
      </h1>

      {/* URL Input + Button */}
      {!isShortened ? (
        <>
          <input
            type="text"
            placeholder="Paste your long URL here..."
            className="px-4 py-3 mb-4 w-full max-w-md rounded-full bg-black border border-white text-white"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter custom short name (optional)..."
            className="px-4 py-3 mb-4 w-full max-w-md rounded-full bg-black border border-white text-white"
            value={customShort}
            onChange={(e) => setCustomShort(e.target.value)}
          />
          <button
            onClick={handleShorten}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full"
          >
            Shorten URL
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={shortUrl}
            readOnly
            onClick={() => window.open(shortUrl, '_blank')}
            className="px-4 py-2 mb-4 w-full max-w-md rounded-full bg-black border border-white underline text-white"
          />
          <button
            onClick={handleReset}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full"
          >
            Generate URL
          </button>
        </>
      )}

      {/* Illustration */}
      <div className="flex justify-center sm:ml-10 max-w-md w-full">
        <img
          src="/img.svg"
          alt="Link sharing illustration"
          className="max-w-md w-full"
        />
      </div>
      <p className="text-gray-500 text-sm text-center">
        BitLink makes sharing your links easier and smarter.
      </p>

    </div>
  );
}

