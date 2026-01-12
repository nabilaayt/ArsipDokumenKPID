import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { PiTrashSimple } from "react-icons/pi";
import { RxDownload } from "react-icons/rx";
import useDoc from "../../hooks/useDoc";

export default function TableDokumen({ data, loading }) {
    const { removeDokumen } = useDoc();
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    const handleDownload = async (doc) => {
        const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

        try {
            const res = await fetch(
                `${BASE_URL}/uploads/${doc.file_url}`
            );

            if (!res.ok) throw new Error("Gagal download");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = doc.file_url;
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error("File tidak bisa diunduh");
            console.error(err);
        }
    };

    if (loading) return <p className="p-8 text-center text-gray-500">Memuat data arsip...</p>;

    return (
        <div className="w-full rounded-xl overflow-hidden bg-white p-2 px-8 pl-8">
            <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="w-42 p-4 px-4 tracking-wide text-left text-lg font-medium text-heading">Nomor Dokumen</th>
                            <th className="w-32 p-4 tracking-wide text-left text-lg font-medium text-heading">Tgl Dokumen</th>
                            <th className="p-4 tracking-wide text-left text-lg font-medium text-heading">Tgl Diterima</th>
                            <th className="w-26 p-4 tracking-wide text-left text-lg font-medium text-heading">Asal Dokumen</th>
                            <th className="w-32 p-4 tracking-wide text-left text-lg font-medium text-heading">Perihal</th>
                            <th className="w-36 p-4 pl-4 tracking-wide text-left text-lg font-medium text-heading">Prioritas</th>
                            <th className="w-36 p-4 pl-4 tracking-wide text-left text-lg font-medium text-heading">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((doc) => (
                            <tr key={doc.id} className="border-b border-gray-200 relative">
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.nomor_dokumen}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.tanggal_dokumen}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.tanggal_diterima}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.asal_dokumen}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.perihal}</td>
                                <td className="p-2">
                                    <span
                                        className={`px-6 py-3 rounded-xl text-sm font-medium ${
                                            doc.prioritas === "Tinggi"
                                                ? "bg-red-100 text-red"
                                                : "bg-blue-100 text-blue"
                                        }`}
                                    >
                                        {doc.prioritas}
                                    </span>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg flex flex-row gap-3 text-gray-600">
                                     <button 
                                        onClick={() => handleDownload(doc)}
                                        className="bg-babyBlue p-2 rounded-lg hover:bg-lime-600 hover:text-white cursor-pointer"
                                    >
                                        <RxDownload size= "24" />
                                    </button>
                                    {isAdmin && (
                                        <>
                                            <NavLink
                                                to={`/admin/editDokumen/${doc.id}`}
                                                className="bg-babyBlue p-2 rounded-lg hover:bg-orange-300 hover:text-white cursor-pointer inline-flex"
                                                >
                                                <FiEdit size="24" style={{ strokeWidth: 1.5 }} />
                                            </NavLink>    
                                            <button
                                                onClick={() => {
                                                    toast((t) => (
                                                    <div className="flex flex-col gap-3">
                                                        <p className="text-gray-700 font-medium">
                                                            Yakin ingin menghapus dokumen ini?
                                                        </p>
                                                        <div className="flex justify-end gap-3">
                                                        <button
                                                            onClick={() => toast.dismiss(t.id)}
                                                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 cursor-pointer"
                                                        >
                                                            Batal
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                            removeDokumen(doc.id)
                                                                .then(() => toast.success("Dokumen berhasil dihapus"))
                                                                .catch(() => toast.error("Gagal menghapus dokumen"));
                                                            toast.dismiss(t.id);
                                                            }}
                                                            className="px-4 py-2 rounded-lg bg-red text-white cursor-pointer"
                                                        >
                                                            Hapus
                                                        </button>
                                                        </div>
                                                    </div>
                                                    ), { duration: Infinity });
                                                }}
                                                className="bg-babyBlue p-2 rounded-lg hover:bg-red hover:text-white cursor-pointer"
                                                >
                                                <PiTrashSimple size="24"/>
                                            </button>                              
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data?.length === 0 && (
                    <p className="text-center py-10 text-gray-400">Belum ada dokumen yang tersimpan.</p>
                )}
            </div>
        </div>
    );
}