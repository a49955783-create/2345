import { useEffect, useState } from "react";

export default function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000); // يختفي بعد 4 ثواني
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-700">
      <img
        src="/logo.png"
        alt="شعار الشرطة"
        className="w-40 h-auto animate-pulse drop-shadow-[0_0_25px_rgba(100,180,255,0.7)]"
      />
    </div>
  );
}
