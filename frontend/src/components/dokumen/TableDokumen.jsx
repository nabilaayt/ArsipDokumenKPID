import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { PiTrashSimple } from "react-icons/pi";
import { RxDownload } from "react-icons/rx";

export default function TableDokumen() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");
    // const { data: courses, deleteCourse, error } = useCourse();

    // if (error) return <p className="text-red-500">Failed to fetch courses.</p>;

    const dummyDocuments = [
        {
            id: 1,
            nomor: "015/KPID-SMS/I/2025",
            tglDokumen: "05-01-2025",
            tglDiterima: "06-01-2025",
            asal: "KPI Pusat",
            perihal: "Edaran Pedoman Penyiaran",
            klasifikasi: "Edaran",
            prioritas: "Normal",
        },
        {
            id: 2,
            nomor: "016/KPID-SMS/I/2025",
            tglDokumen: "05-01-2025",
            tglDiterima: "06-01-2025",
            asal: "KPI Pusat",
            perihal: "Edaran Pedoman Penyiaran",
            klasifikasi: "Pengaduan",
            prioritas: "Normal",
        },
        {
            id: 3,
            nomor: "017/KPID-SMS/I/2025",
            tglDokumen: "05-01-2025",
            tglDiterima: "06-01-2025",
            asal: "KPI Pusat",
            perihal: "Edaran Pedoman Penyiaran",
            klasifikasi: "Undangan",
            prioritas: "Tinggi",
        },
        {
            id: 4,
            nomor: "018/KPID-SMS/I/2025",
            tglDokumen: "05-01-2025",
            tglDiterima: "06-01-2025",
            asal: "KPI Pusat",
            perihal: "Edaran Pedoman Penyiaran",
            klasifikasi: "Edaran",
            prioritas: "Tinggi",
        },
    ];

    const documents = dummyDocuments.slice(0, rowsPerPage);


    return(
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
                        {documents.map((doc) => (
                            <tr key={doc.id} className="border-b border-gray-200 relative">
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.nomor}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.tglDokumen}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.tglDiterima}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-lg text-gray-600">{doc.asal}</td>
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
                                        // onClick={() => handleDownload(doc)}
                                        className="bg-babyBlue p-2 rounded-lg hover:bg-lime-600 hover:text-white"
                                    >
                                        <RxDownload size= "24" />
                                    </button>
                                    {isAdmin && (
                                        <>
                                            <button className="bg-babyBlue p-2 rounded-lg hover:bg-orange-300 hover:text-white">
                                                <NavLink
                                                    to={`/admin/editDokumen/${doc.id}`}
                                                >
                                                    <FiEdit size= "24" style={{ strokeWidth: 1.5 }} />
                                                </NavLink>
                                            </button>    
                                            <button 
                                                // onClick={() => {
                                                //     if (confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) {
                                                //         deleteDokumen(doc.id)
                                                //         .then(() => toast.success("Dokumen berhasil dihapus!"))
                                                //         .catch(() => toast.error("Gagal menghapus dokumen"));
                                                //     }
                                                // }}
                                                className="bg-babyBlue p-2 rounded-lg cursor-pointer hover:bg-red hover:text-white"
                                            >
                                                <PiTrashSimple size= "24" />
                                            </button>                              
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};