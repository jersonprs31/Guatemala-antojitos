'use client';

import { useEffect, useState } from 'react';

export default function VisitTracker() {
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    const storedCount = localStorage.getItem('antojitos_visit_count');
    let newCount = 1;

    if (storedCount) {
      newCount = parseInt(storedCount, 10) + 1;
    }

    localStorage.setItem('antojitos_visit_count', newCount.toString());
    setVisitCount(newCount);
  }, []);

  if (visitCount === 0) return null;

  return (
    <div className="bg-orange-100 text-orange-800 text-sm py-2 px-4 text-center rounded-md mb-6 shadow-sm">
      {visitCount === 1 
        ? '¡Bienvenido a Guatemala Antojitos por primera vez!' 
        : `¡Qué bueno verte de nuevo! Has explorado antojitos ${visitCount} veces.`}
    </div>
  );
}