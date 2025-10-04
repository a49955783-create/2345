import { useEffect, useState } from "react";

export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000); // يختفي بعد 4 ثواني
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0f1a] z-50">
      <div className="relative flex flex-col items-center">
        <img
          src="/3.png"
          alt="شعار الشرطة"
          className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(0,180,255,0.6)]"
        />
        <h1 className="text-white text-2xl mt-4 tracking-wider">تحديث مركز العمليات للشرطة</h1>
      </div>
    </div>
  );
}
