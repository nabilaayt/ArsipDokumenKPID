import { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/TopBar";
import { SlCloudUpload } from "react-icons/sl";
import { FiDownload } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuCheck } from "react-icons/lu";
import useConvertFile from "../hooks/useConvertFile";

export default function KonversiFile() {
    const [activeType, setActiveType] = useState(null);
    const {files, convertFile, loading} = useConvertFile();
    const activeFiles = activeType ? files[activeType] : [];
    
    const handleDownloadAll = async () => {
        const doneFiles = activeFiles.filter(f => f.status === "done");

        for (const file of doneFiles) {
            try {
                const response = await fetch(file.downloadUrl);
                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");

                link.href = url;
                link.download = file.convertedName || file.name;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);
                await new Promise(res => setTimeout(res, 400));
            } catch (err) {
                console.error("Gagal download:", file.name, err);
            }
        }
    };

    return(
        <section id="konversiFile" className="font-poppins bg-babyBlue relative w-full flex min-h-screen overflow-hidden">
            <div className="h-auto">
                <SideBar />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                <Topbar />
                <div className="flex-1">
                    <div className="flex flex-col px-4 sm:px-6 lg:px-8 gap-4 mt-8 mb-5">
                        <div className="flex flex-col gap-4 mb-8">
                            <h1 className="text-gray-700 text-2xl font-semibold">Konversi File</h1>
                            <p className="text-gray-500 text-lg leading-relaxed">Fitur konversi dokumen untuk mendukung efisiensi pengelolaan arsip dan administrasi KPID Sumatera Selatan.</p>
                        </div>

                        {/* Selector Card */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div 
                                onClick={() => setActiveType("wordToPdf")}
                                className={`flex flow-row gap-4 bg-white p-6 rounded-xl items-center cursor-pointer transition
                                    ${activeType === "wordToPdf" ? "ring-1 ring-gray-500" : ""}`}
                            >
                                <img 
                                    src="/assets/wordToPdf.png" 
                                    alt="icon word to pdf" 
                                    className="w-20 h-full"
                                />
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-lg font-medium text-gray-700">Word ke PDF</h1>
                                    <p className="text-lg text-gray-500 max-w-xs">Konversi semua file Word ke format PDF</p>
                                </div>
                            </div>
                            <div 
                                onClick={() => setActiveType("pdfToWord")}
                                className={`flex flow-row gap-4 bg-white p-6 rounded-xl items-center cursor-pointer transition
                                    ${activeType === "pdfToWord" ? "ring-1 ring-gray-500" : ""}`}
                            >
                                <img 
                                    src="/assets/pdfToWord.png" 
                                    alt="icon pdf to word" 
                                    className="w-20 h-full"
                                />
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-lg font-medium text-gray-700">PDF ke Word</h1>
                                    <p className="text-lg text-gray-500 max-w-xs">Konversi semua file PDF ke format Word</p>
                                </div>
                            </div>
                        </div>

                        {/* Upload Card */}
                        {activeType && (
                            <div className="bg-white rounded-2xl py-6 px-8 mt-10 mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mt-3 mb-8">
                                    {activeType === "wordToPdf"
                                    ? "Konversi Word ke PDF" : "Konversi PDF ke Word"}
                                </h2>

                                <label className="relative flex flex-col items-center justify-center w-full h-54 sm:h-56 px-4 sm:px-6 bg-babyBlue border-2 border-dashed border-gray-600 rounded-2xl cursor-pointer hover:border-gray-800 transition">
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <SlCloudUpload size={40} />
                                        <p className="text-gray-700 text-center text-lg">Klik atau seret file Anda ke sini untuk mengonversi</p>
                                        <p className="text-base text-gray-500">
                                            {activeType === "wordToPdf"
                                            ? "Dalam bentuk format .doc, .docx - hingga 50MB" : "Dalam bentuk format .pdf - hingga 50MB"}
                                        </p>
                                    </div>

                                    <input 
                                        type="file" 
                                        accept={
                                            activeType === "wordToPdf" ? ".doc, .docx" : ".pdf"
                                        }
                                        className="hidden"
                                        onChange={(e) => {
                                            if(!e.target.files[0]) return;
                                            convertFile(e.target.files[0], activeType);
                                            e.target.value = "";
                                        }}
                                    />
                                </label>

                                {/* File List */}
                                {activeFiles.length > 0 && (
                                    <div className="flex flex-col gap-4 mt-8">
                                        {activeFiles.map((file) => (
                                            <div key={file.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-babyBlue rounded-xl px-4 sm:px-5 py-4">
                                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                                    <img 
                                                        src={
                                                            activeType === "wordToPdf"
                                                                ? "/assets/pdf.png"
                                                                : "/assets/docx.png"
                                                        }
                                                        alt="file"
                                                        className="w-7 h-full shrink-0"
                                                    />
                                                    <p className="text-gray-700 font-medium wrap-break-word">{file.name}</p>
                                                </div>
                                                <div className="flex flex-row max-w-md">
                                                    <div className="flex items-center gap-2 mt-1 text-sm">
                                                        {file.status ===
                                                            "done" ? (
                                                                <>
                                                                    <LuCheck className="text-green-600" size={20} />
                                                                    <span className="text-green-600 text-base">
                                                                        Dikonversi
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <AiOutlineLoading3Quarters className="animate-spin text-gray-500" />
                                                                    <span className="text-gray-500 text-base">
                                                                        Mengonversi
                                                                    </span>
                                                                </>
                                                            )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                                    <span className="text-gray-500 text-base">{file.size}</span>
                                                    {file.status === "done" && (
                                                        <button
                                                            onClick={async () => {
                                                                const res = await fetch(file.downloadUrl);
                                                                const blob = await res.blob();

                                                                const url = URL.createObjectURL(blob);
                                                                const a = document.createElement("a");
                                                                a.href = url;
                                                                a.download = file.convertedName;
                                                                document.body.appendChild(a);
                                                                a.click();
                                                                document.body.removeChild(a);
                                                                URL.revokeObjectURL(url);
                                                            }}
                                                            className="p-2 rounded-lg bg-white cursor-pointer"
                                                        >
                                                            <FiDownload size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Footer */}
                                {activeFiles.length > 0 && (
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                                        <p className="text-gray-500">
                                            Total {activeFiles.length} file
                                        </p>
                                        <button 
                                            onClick={handleDownloadAll}
                                            disabled={activeFiles.filter(f => f.status === "done").length === 0}
                                            className="flex items-center gap-2 bg-red text-white px-6 py-3 cursor-pointer rounded-xl transition"
                                        >
                                            <FiDownload />
                                            Unduh semua
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};