// استيراد تنسيق الموقع العام
import "@/styles/globals.css";

// استيراد مكون الانترو
import Intro from "@/components/Intro";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* شاشة الانترو تظهر أول 4 ثواني */}
      <Intro />

      {/* خلفية الموقع الأساسية */}
      <div className="min-h-screen bg-[#0b0f17] text-white font-sans transition-all duration-700">
        <Component {...pageProps} />
      </div>
    </>
  );
}
