"use client";
import React, { useState, useEffect } from "react";

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-end gap-2 md:gap-4 max-w-lg mx-auto">
      <TimeUnit value={timeLeft.days} label="DAYS" />
      <TimeUnit value={timeLeft.hours} label="HOURS" />
      <TimeUnit value={timeLeft.minutes} label="MINUTES" />
      <TimeUnit value={timeLeft.seconds} label="SECONDS" />
    </div>
  );
}

function TimeUnit({ value, label }) {
  return (
    <section className="py-16">
    <div className="flex flex-col items-center">
      <div className="border border-gray-200 rounded-xl px-5 py-4 md:px-7 md:py-5 bg-white">
        <span className="text-3xl md:text-5xl font-bold text-[#2B2B36]">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-2">
        {label}
      </span>
    </div>
    </section>
  );
}
