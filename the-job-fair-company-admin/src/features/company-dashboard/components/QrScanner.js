"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { scanCandidate } from "@/features/company-dashboard/actions/companyData";
import toast from "react-hot-toast";

export default function QrScanner({ companyId }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCandidate, setScannedCandidate] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  // Shared function to process a decoded QR text
  const processDecodedText = async (decodedText) => {
    let publicId = decodedText;
    try {
      const url = new URL(decodedText);
      const pathParts = url.pathname.split("/").filter(Boolean);
      publicId = pathParts[pathParts.length - 1];
    } catch {
      publicId = decodedText;
    }

    setProcessing(true);
    const result = await scanCandidate(companyId, publicId);
    setProcessing(false);

    if (result.error) {
      setError(result.error);
      if (result.candidate) {
        setScannedCandidate(result.candidate);
      }
      toast.error(result.error);
    } else if (result.success) {
      setScannedCandidate(result.candidate);
      toast.success(
        `${result.candidate.first_name} ${result.candidate.last_name} scanned successfully!`
      );
    }
  };

  const startScanning = async () => {
    setError(null);
    setScannedCandidate(null);
    setIsScanning(true);

    // Wait for the DOM element to be available
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerInstanceRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // Stop scanning immediately after decode
          await html5QrCode.stop();
          scannerInstanceRef.current = null;
          setIsScanning(false);
          await processDecodedText(decodedText);
        },
        (errorMessage) => {
          // QR decode errors (ignore, scanner keeps running)
        }
      );
    } catch (err) {
      setIsScanning(false);
      setError(
        "Could not access camera. Please ensure camera permissions are granted."
      );
      console.error("[QR_SCANNER_ERROR]:", err);
    }
  };

  // Process a pasted QR code data URL image
  const handleLinkSubmit = async () => {
    if (!linkInput.trim()) {
      toast.error("Please paste a QR code image link.");
      return;
    }

    setError(null);
    setScannedCandidate(null);

    const trimmed = linkInput.trim();

    // If it's a data:image URL, decode the QR from it
    if (trimmed.startsWith("data:image")) {
      try {
        // Convert data URL to blob then File
        const res = await fetch(trimmed);
        const blob = await res.blob();
        const file = new File([blob], "qrcode.png", { type: blob.type });

        const html5QrCode = new Html5Qrcode("qr-link-decoder");
        const decodedText = await html5QrCode.scanFileV2(file, false);
        html5QrCode.clear();
        await processDecodedText(decodedText.decodedText);
        setLinkInput("");
      } catch (err) {
        console.error("[QR_DECODE_ERROR]:", err);
        setError("Could not decode QR code from the image. Please ensure the link is a valid QR code image.");
      }
    } else {
      // Treat as a direct URL (e.g. http://localhost:3001/api/candidate/abc123)
      await processDecodedText(trimmed);
      setLinkInput("");
    }
  };

  const stopScanning = async () => {
    if (scannerInstanceRef.current) {
      try {
        await scannerInstanceRef.current.stop();
      } catch (e) {
        // already stopped
      }
      scannerInstanceRef.current = null;
    }
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScannedCandidate(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.stop().catch(() => {});
      }
    };
  }, []);


  return (
    <div className="space-y-6">
      {/* Scanner Area */}
      <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl p-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Camera Scanner</h3>
            <p className="text-sm text-slate-500 mt-1">
              Point your camera at a candidate&apos;s QR code to scan them.
            </p>
          </div>
          {!isScanning ? (
            <button
              onClick={startScanning}
              disabled={processing}
              className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Start Scanner
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
              Stop Scanner
            </button>
          )}
        </div>

        {/* Camera Feed */}
        {isScanning && (
          <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-200 bg-black">
            <div id="qr-reader" ref={scannerRef} className="w-full" />
          </div>
        )}

        {/* Idle State */}
        {!isScanning && !scannedCandidate && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-20 w-20 rounded-3xl bg-linear-to-tr from-indigo-100 to-violet-100 flex items-center justify-center mb-6 shadow-sm">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">
              Ready to Scan
            </h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Click &ldquo;Start Scanner&rdquo; to activate your camera and scan a
              candidate&apos;s QR code.
            </p>
          </div>
        )}

        {/* Processing State */}
        {processing && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mb-6" />
            <p className="text-sm font-medium text-slate-600">
              Processing scan...
            </p>
          </div>
        )}
      </div>

      {/* Paste QR Image Link */}
      <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl p-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800">Paste QR Image Link</h3>
          <p className="text-sm text-slate-500 mt-1">
            Paste a QR code image data URL or a direct candidate link to register them.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Paste data:image/png;base64,... or candidate URL here"
            className="flex-1 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 resize-none transition-all"
            rows={3}
          />
          <button
            onClick={handleLinkSubmit}
            disabled={processing || !linkInput.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-end"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Register
          </button>
        </div>

        {/* Hidden div for QR decoding from image */}
        <div id="qr-link-decoder" className="hidden" />
      </div>

      {/* Result Card */}
      {scannedCandidate && (
        <div
          className={`overflow-hidden rounded-3xl border ${
            error
              ? "border-amber-200 bg-amber-50/60"
              : "border-emerald-200 bg-emerald-50/60"
          } shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl p-8`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                error
                  ? "bg-amber-100 text-amber-600"
                  : "bg-emerald-100 text-emerald-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {error ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                )}
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {error ? "Already Scanned" : "Scan Successful!"}
              </h3>
              <p className="text-sm text-slate-500">
                {error || "Candidate has been registered to your company."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/80 rounded-2xl p-4 border border-white/60">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Name
              </div>
              <div className="text-sm font-bold text-slate-800">
                {scannedCandidate.first_name} {scannedCandidate.last_name}
              </div>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 border border-white/60">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Email
              </div>
              <div className="text-sm font-medium text-slate-700">
                {scannedCandidate.email}
              </div>
            </div>
            {scannedCandidate.phone && (
              <div className="bg-white/80 rounded-2xl p-4 border border-white/60">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Phone
                </div>
                <div className="text-sm font-medium text-slate-700">
                  {scannedCandidate.phone}
                </div>
              </div>
            )}
            {scannedCandidate.university && (
              <div className="bg-white/80 rounded-2xl p-4 border border-white/60">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  University
                </div>
                <div className="text-sm font-medium text-slate-700">
                  {scannedCandidate.university}
                </div>
              </div>
            )}
          </div>

          {scannedCandidate.skills && scannedCandidate.skills.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Skills
              </div>
              <div className="flex flex-wrap gap-1.5">
                {scannedCandidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-lg bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-white/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={resetScanner}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            Scan Another
          </button>
        </div>
      )}

      {/* Error without candidate info */}
      {error && !scannedCandidate && (
        <div className="overflow-hidden rounded-3xl border border-red-200 bg-red-50/60 shadow-sm backdrop-blur-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Scan Error</h3>
              <p className="text-sm text-slate-600">{error}</p>
            </div>
          </div>
          <button
            onClick={resetScanner}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
