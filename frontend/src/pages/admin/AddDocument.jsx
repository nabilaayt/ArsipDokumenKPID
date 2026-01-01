import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";
import { SlCloudUpload } from "react-icons/sl";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDokumen } from "../../services/document";
import DropDownPrioritasForm from "../../components/dokumen/DropDownPrioritasForm";

export default function AddDokumen() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        nomor_dokumen: "",
        asal_dokumen: "",
        perihal: "",
        prioritas: "",
        tanggal_dokumen: "",
        tanggal_diterima: "",
        file: null,
        file_url: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setForm({
            ...form,
            file: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.file) {
            toast.error("File dokumen wajib diunggah");
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            setLoading(true);
            await addDokumen(formData);
            toast.success("Dokumen berhasil ditambahkan");
            navigate("/admin/dokumen");
        } catch (error) {
            toast.error("Gagal menambahkan dokumen");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <section id="addDokumen" className="font-poppins bg-babyBlue relative w-full flex min-h-screen overflow-hidden">
            <div className="h-auto">
                <SideBar />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                <Topbar />
                <div className="flex-1 px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-col w-full relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white gap-10 z-10 mb-5 mt-10">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl text-gray-700 font-bold">Tambah Dokumen</h1>
                            <p className="text-lg text-gray-500">Lengkapi data dokumen agar dapat dicatat dan diarsipkan ke dalam sistem.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="nomor_dokumen" className="text-lg font-medium text-gray-700">Nomor Dokumen</label>
                                        <input 
                                            type="text" 
                                            id="nomor_dokumen"
                                            value={form.nomor_dokumen}
                                            onChange={handleChange}
                                            placeholder="Masukkan nomor dokumen"
                                            className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none focus:ring-1 focus:ring-gray-700"
                                        />                                    
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="asal_dokumen" className="text-lg font-medium text-gray-700">Asal Dokumen</label>
                                        <input 
                                            type="text" 
                                            id="asal_dokumen"
                                            value={form.asal_dokumen}
                                            onChange={handleChange}
                                            placeholder="Masukkan asal dokumen"
                                            className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none focus:ring-1 focus:ring-gray-700"
                                        />                                    
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="perihal" className="text-lg font-medium text-gray-700">Perihal</label>
                                        <input 
                                            type="text" 
                                            id="perihal"
                                            value={form.perihal}
                                            onChange={handleChange}
                                            placeholder="Masukkan perihal dokumen"
                                            className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none focus:ring-1 focus:ring-gray-700"
                                        />                                    
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className="text-lg font-medium text-gray-700">Prioritas</label>
                                    <DropDownPrioritasForm
                                        value={form.prioritas}
                                        onChange={(value) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                prioritas: value,
                                            }))
                                        }
                                    />                                    
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="tanggal_dokumen" className="text-lg font-medium text-gray-700">Tanggal Dokumen</label>
                                        <input 
                                            type="date" 
                                            id="tanggal_dokumen"
                                            value={form.tanggal_dokumen}
                                            onChange={handleChange}
                                            placeholder="Masukkan tanggal dokumen"
                                            className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none focus:ring-1 focus:ring-gray-700"
                                        />                                    
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="tanggal_diterima" className="text-lg font-medium text-gray-700">Tanggal Diterima</label>
                                        <input 
                                            type="date" 
                                            id="tanggal_diterima"
                                            value={form.tanggal_diterima}
                                            onChange={handleChange}
                                            placeholder="Masukkan tanggal dokumen"
                                            className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none focus:ring-1 focus:ring-gray-700"
                                        />                                    
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className="text-lg font-medium text-heading">
                                        Unggah Dokumen
                                    </label>

                                    <label className="relative flex flex-col items-center justify-center w-full h-42 bg-babyBlue border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer hover:border-gray-700 transition-colors">
                                        <div className="flex flex-col items-center justify-center gap-3 py-6">
                                            {form.file ? (
                                                <div className="text-center px-6">
                                                    <p className="text-lg text-gray-700 break-all">
                                                        {form.file.name}
                                                    </p>
                                                </div>
                                            ) : (
                                                <>
                                                    <SlCloudUpload size="40" style={{ strokeWidth: 1.5 }} />
                                                    <div className="text-center px-6">
                                                        <p className="text-base text-gray-600 font-medium">
                                                            Klik atau seret file Anda ke sini
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            .doc, .docx, .pdf — maksimal 200MB
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-row w-full gap-5 items-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-red text-white text-lg font-medium rounded-2xl px-5 py-3 w-full hover:scale-[1.02] transition-transform cursor-pointer"
                                >
                                    Simpan
                                </button>
                                <NavLink
                                    to="/admin/dokumen"
                                    className="bg-babyBlue text-center text-lg font-medium w-full text-gray-700 px-5 py-3 rounded-2xl hover:scale-[1.02] transition-transform cursor-pointer"
                                >
                                    Batal
                                </NavLink>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </section>
    );
};