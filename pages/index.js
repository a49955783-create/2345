import { useState } from "react";
import Tesseract from "tesseract.js";
import Intro from "@/components/Intro";
import UnitTable from "@/components/UnitTable";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [units, setUnits] = useState([]);
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // معالجة رفع الصورة أو اللصق
  const handleImage = (file) => {
    if (!file) return;
    setLoading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = () => {
      Tesseract.recognize(reader.result, "ara+eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setUploadProgress(Math.round(m.progress * 100));
          }
        },
      })
        .then(({ data: { text } }) => {
          setResultText(text);
          parseText(text);
        })
        .finally(() => setLoading(false));
    };
    reader.readAsDataURL(file);
  };

  // سحب النصوص وتحليلها إلى أسماء وأكواد
  const parseText = (text) => {
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    const parsedUnits = lines.map((line) => {
      const parts = line.trim().split(" ");
      const code = parts.pop();
      const name = parts.join(" ");
      return { name, code, status: "", location: "", partner: "" };
    });
    setUnits(parsedUnits);
  };

  // لصق الصورة أو رفعها
  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        handleImage(file);
      }
    }
  };

  // نسخ النتيجة النهائية
  const handleCopy = () => {
    const finalText = generateFinalReport();
    navigator.clipboard.writeText(finalText);
    alert("✅ تم النسخ بنجاح");
  };

  // توليد النموذج النهائي
  const generateFinalReport = () => {
    const inField = units.filter((u) => u.status !== "خارج الخدمة");
    const offField = units.filter((u) => u.status === "خارج الخدمة");

    const formatUnits = (arr) =>
      arr
        .map(
          (u) =>
            `${u.name} ${u.code}${
              u.status ? ` (${u.status})` : ""
            }${u.location ? ` - (${u.location})` : ""}${
              u.partner ? ` + ${u.partner}` : ""
            }`
        )
        .join("\n");

    return `
📌 استلام العمليات 📌

عدد واسماء الوحدات في الميدان: (${inField.length})
${formatUnits(inField)}

وحدات مشتركة:
${units
  .filter((u) => u.partner)
  .map(
    (u) =>
      `${u.name} ${u.code} + ${u.partner}${
        u.location ? ` (${u.location})` : ""
      }`
  )
  .join("\n")}

خارج الخدمة: (${offField.length})
${formatUnits(offField)}
    `;
  };

  // معالجة اختيار الصورة
  const handleFileInput = (e) => {
    handleImage(e.target.files[0]);
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8 bg-[url('/police-bg.jpg')] bg-cover bg-center text-white"
      onPaste={handlePaste}
    >
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

      {!showIntro && (
        <div className="max-w-5xl mx-auto space-y-4">
          <header className="flex flex-col items-center justify-center text-center mb-6">
            <img
              src="/police-logo.png"
              alt="شعار الشرطة"
              className="w-24 h-24 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
            <h1 className="text-3xl font-bold glow mb-2">
              تحديث مركز العمليات للشرطة
            </h1>
            <p className="text-gray-300 text-sm">
              يمكنك رفع أو لصق صورة لاستخراج الأسماء والأكواد مباشرة.
            </p>
          </header>

          <div className="flex flex-col items-center justify-center gap-4">
            <label className="bg-accentBlue px-5 py-3 rounded-lg shadow-glow cursor-pointer hover:bg-blue-500">
              رفع صورة من الجهاز
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                hidden
              />
            </label>

            {loading && (
              <div className="text-center text-sm text-gray-300">
                جارِ استخراج النص... {uploadProgress}%
              </div>
            )}
          </div>

          <UnitTable units={units} setUnits={setUnits} />

          {units.length > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={handleCopy}
                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-glow hover:bg-green-500"
              >
                نسخ النتيجة النهائية
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
