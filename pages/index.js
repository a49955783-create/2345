import { useState } from "react";
import Intro from "@/components/Intro";

export default function Home() {
  const [formData, setFormData] = useState({
    operationsName: "",
    operationsCode: "",
    deputyName: "",
    deputyCode: "",
    managerName: "",
    managerCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyResult = () => {
    const text = generateResult();
    navigator.clipboard.writeText(text);
    alert("✅ تم نسخ النتيجة!");
  };

  const generateResult = () => {
    return `📌 استلام العمليات 📌
المستلم: ${formData.operationsName} ${formData.operationsCode}
النائب: ${formData.deputyName} ${formData.deputyCode}
مسؤول الفترة: ${formData.managerName} ${formData.managerCode}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-8 flex flex-col items-center">
      <Intro />

      <div className="w-full max-w-5xl mt-12">
        <div className="bg-[#111827] p-6 rounded-2xl shadow-md border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">النتيجة النهائية</h2>
            <button
              onClick={copyResult}
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1 rounded-md"
            >
              نسخ النتيجة
            </button>
          </div>

          <textarea
            readOnly
            className="w-full h-40 p-3 bg-[#0d121d] border border-gray-700 rounded-md resize-none text-gray-200"
            value={generateResult()}
          />
          <p className="text-xs text-gray-400 mt-1">
            المستلم يُحتسب ضمن العدد ولا يُعرض ضمن قائمة الميدان.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div>
            <label className="block text-sm mb-1">المستلم — الاسم</label>
            <input
              name="operationsName"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0d121d] border border-gray-700"
            />
            <label className="block text-sm mt-2 mb-1">الكود</label>
            <input
              name="operationsCode"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0d121d] border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">النائب — الاسم</label>
            <input
              name="deputyName"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0d121d] border border-gray-700"
            />
            <label className="block text-sm mt-2 mb-1">الكود</label>
            <input
              name="deputyCode"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0d121d] border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">مسؤول الفترة — الاسم</label>
            <input
              name="managerName"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0d121d] border border-gray-700"
            />
            <label className="block text-sm mt-2 mb-1">الكود</label>
            <input
              name="managerCode"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0d121d] border border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
