import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";
import { SlCloudUpload } from "react-icons/sl";
import toast from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDokumenById, updateDokumen } from "../../services/document";

export default function EditDokumen() {
    const { id } = useParams();
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
    });

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getDokumenById(id);
                const data = res.data.payload;

                setForm({
                    nomor_dokumen: data.nomor_dokumen,
                    asal_dokumen: data.asal_dokumen,
                    perihal: data.perihal,
                    prioritas: data.prioritas,
                    tanggal_dokumen: data.tanggal_dokumen?.slice(0, 10),
                    tanggal_diterima: data.tanggal_diterima?.slice(0, 10),
                    file: null, 
                });

                setLoading(false);
            } catch (error) {
                toast.error("Gagal mengambil data dokumen");
            }
        };

        fetchDetail();
    }, [id]);

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

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if(value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await updateDokumen(id, formData);
            toast.success("Dokumen berhasil diperbarui");
            navigate("/admin/dokumen");
        } catch (error) {
            toast.error("Gagal update dokumen");
            console.error(error);
        }
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setFileName(file.name);
    //         setForm({ ...form, cover: file });
    //     } else {
    //         setFileName("No file chosen");
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if(!selectedCategory || !selectedCategory.id) {
    //         toast.error("Please select a category");
    //         return;
    //     }

    //     const addData = {
    //         ...form,
    //         category_id: selectedCategory.id,
    //     };
        
    //     try {
    //         await createDokumen(addData);
    //         toast.success("Course added successfully!");
    //         navigate("/admin/courses");
    //     } catch (error) {
    //         console.error("Failed to add course:", error);
    //         toast.error("Failed to add course.");
    //     }
    // };

    if (loading) {
    return <p className="p-8 text-center">Memuat data dokumen...</p>;
    }

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
                            <h1 className="text-2xl text-gray-700 font-bold">Edit Dokumen</h1>
                            <p className="text-lg text-gray-500">Perbarui data dokumen yang sudah tersimpan.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="noDokumen" className="text-lg font-medium text-gray-700">Nomor Dokumen</label>
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
                                    <label htmlFor="asalDokumen" className="text-lg font-medium text-gray-700">Asal Dokumen</label>
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
                                    <label htmlFor="prioritas" className="text-lg font-medium text-gray-700">Prioritas</label>
                                        <input 
                                            type="text" 
                                            id="prioritas"
                                            value={form.prioritas}
                                            onChange={handleChange}
                                            placeholder="Masukkan prioritas dokumen"
                                            className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none focus:ring-1 focus:ring-gray-700"
                                        />                                    
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="tglDokumen" className="text-lg font-medium text-gray-700">Tanggal Dokumen</label>
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
                                    <label htmlFor="tglDiterima" className="text-lg font-medium text-gray-700">Tanggal Diterima</label>
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
                                    <label htmlFor="fileUrl" className="text-lg font-medium text-heading">Unggah Dokumen</label>
                                    <label htmlFor="fileUrl"  className="relative flex flex-col items-center justify-center w-full h-42 bg-babyBlue border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer hover:border-gray-700 transition-colors">
                                        <div className="flex flex-col items-center justify-center gap-3 py-6">
                                            <SlCloudUpload size= "40" style={{ strokeWidth: 1.5 }} />
                                            <div className="text-center px-4">
                                                <p className="text-base text-gray-600 font-medium">
                                                    Klik atau seret file Anda ke sini.
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    .doc, .docx dan pdf - hingga 200MB
                                                </p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            id="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {/* {form.fileUrl && (
                                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                            <p className="text-sm text-gray-700">
                                                File terpilih: <span className="font-medium">{form.fileUrl.name}</span>
                                            </p>
                                        </div>
                                    )} */}
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
                                    to={`/admin/editDokumen/${id}`}
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