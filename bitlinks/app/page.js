"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShort, setCustomShort] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!originalUrl || loading) return;

    setLoading(true); // disable button

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUrl,
          shortId: customShort || undefined,
        }),

      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.shortUrl);
        setIsShortened(true);
      } else {
        alert(data.message || "Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // re-enable button
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
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6">
        Shorten. <span className="text-blue-500">Share.</span> Track.

        <p className="text-gray-400 font-normal mt-3 text-xs sm:text-sm sm:text-l">
          Create short, beautiful, and trackable URLs for your links — fast, reliable, and secure.
        </p>
      </h1>

      {/* URL Input + Button */}
      {!isShortened ? (
        <>
          <input
            type="text"
            placeholder="Paste your long URL here..."
            className="input-box"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter custom short name (optional)..."
            className="input-box"
            value={customShort}
            onChange={(e) => setCustomShort(e.target.value)}
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>

        </>
      ) : (
        <>
          <input
            type="text"
            value={shortUrl}
            readOnly
            onClick={() => window.open(shortUrl, '_blank')}
            className="input-box underline"
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
      <div className="flex justify-center max-w-md w-full">
        <Image
          src="/img.svg"
          height={400}
          width={400}
          alt="Link sharing illustration"
          className="max-w-md w-full"
          priority
        />
      </div>
      <p className="text-gray-500 text-sm text-center">
        BitLink makes sharing your links easier and smarter.
      </p>

    </div>
  );
}

