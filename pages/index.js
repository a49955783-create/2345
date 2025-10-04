import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [finalText, setFinalText] = useState("");

  // الحقول الجديدة
  const [opsName, setOpsName] = useState("");
  const [opsCode, setOpsCode] = useState("");
  const [depName, setDepName] = useState("");
  const [depCode, setDepCode] = useState("");
  const [chiefName, setChiefName] = useState("");
  const [chiefCode, setChiefCode] = useState("");

  // بناء النتيجة النهائية
  function buildFinalText(rows) {
    const inService = rows.filter((r) => r.status === "في الخدمة");
    const off = rows.filter((r) => r.status === "خارج الخدمة");
    const shared = rows.filter(
      (r) => r.group === "shared" && r.partner && r.partner.name
    );
    const speed = rows.filter((r) => r.group === "speed");
    const bike = rows.filter((r) => r.group === "bike");

    const inFieldLines = inService.map((r) => `${r.name} ${r.code}`);
    const sharedLines = shared.map(
      (r) => `${r.name} ${r.code} + ${r.partner.name} ${r.partner.code}`
    );
    const speedLines = speed.map((r) => `${r.name} ${r.code}`);
    const bikeLines = bike.map((r) => `${r.name} ${r.code}`);
    const offLines = off.map((r) => `${r.name} ${r.code}`);

    return [
      "📌 استلام العمليات 📌",
      "",
      opsName || opsCode ? `المستلم: ${opsName} ${opsCode}` : "",
      depName || depCode ? `النائب: ${depName} ${depCode}` : "",
      chiefName || chiefCode ? `مسؤول الفترة: ${chiefName} ${chiefCode}` : "",
      "",
      `عدد واسماء الوحدات في الميدان: (${inService.length})`,
      ...inFieldLines,
      "",
      speedLines.length ? "وحدات سبيد يونت:" : "",
      ...speedLines,
      "",
      bikeLines.length ? "وحدات دباب:" : "",
      ...bikeLines,
      "",
      sharedLines.length ? "وحدات مشتركة:" : "",
      ...sharedLines,
      "",
      `خارج الخدمة: (${off.length})`,
      ...offLines,
    ]
      .filter(Boolean)
      .join("\n");
  }

  useEffect(() => {
    setFinalText(buildFinalText(rows));
  }, [rows, opsName, opsCode, depName, depCode, chiefName, chiefCode]);

  return (
    <>
      <Head>
        <title>تحديث مركز العمليات للشرطة</title>
      </Head>

      <main className="min-h-screen bg-[#0a0d15] text-white p-4 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* شعار */}
          <div className="flex justify-center mb-4">
            <img src="/3.png" alt="شعار الشرطة" className="w-32 h-auto" />
          </div>

          {/* النتيجة النهائية */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">النتيجة النهائية</h2>
              <button
                onClick={() => navigator.clipboard.writeText(finalText)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
              >
                نسخ النتيجة
              </button>
            </div>
            <textarea
              value={finalText}
              readOnly
              rows={10}
              className="w-full bg-transparent text-white resize-none outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              المستلم يُحتسب ضمن العدد ولا يُعرض ضمن قائمة الميدان.
            </p>
          </div>

          {/* الحقول الجديدة */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label>العمليات — الاسم</label>
              <input
                value={opsName}
                onChange={(e) => setOpsName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-2 rounded"
              />
              <label>الكود —</label>
              <input
                value={opsCode}
                onChange={(e) => setOpsCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-2 rounded"
              />
            </div>

            <div className="space-y-2">
              <label>النائب — الاسم</label>
              <input
                value={depName}
                onChange={(e) => setDepName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-2 rounded"
              />
              <label>الكود —</label>
              <input
                value={depCode}
                onChange={(e) => setDepCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-2 rounded"
              />
            </div>

            <div className="space-y-2">
              <label>مسؤول الفترة — الاسم</label>
              <input
                value={chiefName}
                onChange={(e) => setChiefName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-2 rounded"
              />
              <label>الكود —</label>
              <input
                value={chiefCode}
                onChange={(e) => setChiefCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-2 rounded"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
