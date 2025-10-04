import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 2000); // fade-out مدته 2 ثانية
    }, 5000); // يظهر 5 ثواني
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    visible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 z-50 fade-in fade-out"
      >
        <div className="text-center">
          <Image
            src="/police-logo.png"
            alt="شعار الشرطة"
            width={200}
            height={200}
            className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            priority
          />
          <h1 className="text-2xl md:text-3xl font-bold glow">
            تحديث مركز العمليات للشرطة
          </h1>
        </div>
      </motion.div>
    )
  );
}
