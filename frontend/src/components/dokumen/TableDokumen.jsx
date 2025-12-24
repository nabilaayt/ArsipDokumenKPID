import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { PiTrashSimple } from "react-icons/pi";
import { RxDownload } from "react-icons/rx";
import { getDokumen } from "../../services/api"; // Pastikan path ini benar

export default function TableDokumen() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Ambil data dari Backend saat komponen dimuat
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getDokumen();
            if (res.status === 200) {
                setDocuments(res.payload);
            }
        } catch (error) {
            toast.error("Gagal mengambil data dari server");
        } finally {
            setLoading(false);
        }
    };

    // 2. Fungsi Hapus
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`http://localhost:3000/api/dokumen/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const result = await res.json();
                
                if (res.ok) {
                    toast.success("Dokumen berhasil dihapus!");
                    loadData(); // Refresh tabel
                } else {
                    toast.error(result.message || "Gagal menghapus");
                }
            } catch (error) {
                toast.error("Terjadi kesalahan koneksi");
            }
        }
    };

    // 3. Fungsi Download
    const handleDownload = (filename) => {
        window.open(`http://localhost:3000/api/download/${filename}`, "_blank");
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
                        {documents.slice(0, rowsPerPage).map((doc) => (
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
                                                ? "bg-red-100 text-red-600"
                                                : "bg-blue-100 text-blue-600"
                                        }`}
                                    >
                                        {doc.prioritas}
                                    </span>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg flex flex-row gap-3 text-gray-600">
                                    {/* Tombol Download */}
                                    <button 
                                        onClick={() => handleDownload(doc.file_url)}
                                        className="bg-blue-50 p-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                                    >
                                        <RxDownload size="24" />
                                    </button>

                                    {/* Tombol Edit */}
                                    <NavLink
                                        to={`/admin/editDokumen/${doc.id}`}
                                        className="bg-blue-50 p-2 rounded-lg hover:bg-orange-400 hover:text-white transition-colors"
                                    >
                                        <FiEdit size="24" style={{ strokeWidth: 1.5 }} />
                                    </NavLink>

                                    {/* Tombol Hapus */}
                                    <button 
                                        onClick={() => handleDelete(doc.id)}
                                        className="bg-blue-50 p-2 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white transition-colors"
                                    >
                                        <PiTrashSimple size="24" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {documents.length === 0 && (
                    <p className="text-center py-10 text-gray-400">Belum ada dokumen yang tersimpan.</p>
                )}
            </div>
        </div>
    );
}