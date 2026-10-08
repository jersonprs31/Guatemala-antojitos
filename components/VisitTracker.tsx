"use client";

import { useEffect, useState } from "react";

export default function VisitTracker() {
  const [visits, setVisits] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedVisits = localStorage.getItem("visitCount");
    const currentVisits = storedVisits ? parseInt(storedVisits, 10) : 0;
    const newVisits = currentVisits + 1;
    
    localStorage.setItem("visitCount", newVisits.toString());
    setVisits(newVisits);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#fdf0d5] text-[#8b5a2b] py-2 px-4 rounded-md text-center text-sm font-medium mb-6">
      {visits > 1 
        ? `Great to see you again! You have explored antojitos ${visits} times.`
        : "Welcome! This is your first time exploring our antojitos."}
    </div>
  );
}