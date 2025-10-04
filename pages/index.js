import { useState } from "react";

export default function Home() {
  const [receiver, setReceiver] = useState({ name: "", code: "" });
  const [deputy, setDeputy] = useState({ name: "", code: "" });
  const [manager, setManager] = useState({ name: "", code: "" });
  const [result, setResult] = useState("");

  const updateResult = () => {
    const text = `📌 استلام العمليات 📌

المستلم: ${receiver.name || "—"} ${receiver.code || ""}
النائب: ${deputy.name || "—"} ${deputy.code || ""}
مسؤول الفترة: ${manager.name || "—"} ${manager.code || ""}`;

    setResult(text);
  };

  const handleChange = (field, key, value) => {
    if (field === "receiver") setReceiver({ ...receiver, [key]: value });
    if (field === "deputy") setDeputy({ ...deputy, [key]: value });
    if (field === "manager") setManager({ ...manager, [key]: value });
    setTimeout(updateResult, 100);
  };

  return (
    <main className="min-h-screen bg-[#0e1116] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-6">تحديث مركز عمليات الشرطة</h1>

      <div className="w-full max-w-5xl bg-[#141820] p-6 rounded-xl shadow-lg">
        <div className="flex justify-between mb-3 items-center">
          <h2 className="text-lg font-bold">النتيجة النهائية</h2>
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm"
          >
            نسخ النتيجة
          </button>
        </div>

        <textarea
          value={result}
          readOnly
          className="w-full h-40 bg-[#0f131a] text-white p-3 rounded-md resize-none outline-none text-right"
        />
        <p className="text-gray-400 text-sm mt-1">
          المستلم يُحسب ضمن العدد ولا يُعرض ضمن قائمة الميدان.
        </p>
      </div>

      <div className="w-full max-w-5xl mt-6 bg-[#141820] p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
        {/* المستلم */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">المستلم — الاسم</label>
          <input
            value={receiver.name}
            onChange={(e) => handleChange("receiver", "name", e.target.value)}
            className="w-full p-2 bg-[#0f131a] rounded-md outline-none text-white"
          />
          <label className="block mt-2 mb-2 text-sm text-gray-300">الكود</label>
          <input
            value={receiver.code}
            onChange={(e) => handleChange("receiver", "code", e.target.value)}
            className="w-full p-2 bg-[#0f131a] rounded-md outline-none text-white"
          />
        </div>

        {/* النائب */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">النائب — الاسم</label>
          <input
            value={deputy.name}
            onChange={(e) => handleChange("deputy", "name", e.target.value)}
            className="w-full p-2 bg-[#0f131a] rounded-md outline-none text-white"
          />
          <label className="block mt-2 mb-2 text-sm text-gray-300">الكود</label>
          <input
            value={deputy.code}
            onChange={(e) => handleChange("deputy", "code", e.target.value)}
            className="w-full p-2 bg-[#0f131a] rounded-md outline-none text-white"
          />
        </div>

        {/* مسؤول الفترة */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">مسؤول الفترة — الاسم</label>
          <input
            value={manager.name}
            onChange={(e) => handleChange("manager", "name", e.target.value)}
            className="w-full p-2 bg-[#0f131a] rounded-md outline-none text-white"
          />
          <label className="block mt-2 mb-2 text-sm text-gray-300">الكود</label>
          <input
            value={manager.code}
            onChange={(e) => handleChange("manager", "code", e.target.value)}
            className="w-full p-2 bg-[#0f131a] rounded-md outline-none text-white"
          />
        </div>
      </div>
    </main>
  );
}
