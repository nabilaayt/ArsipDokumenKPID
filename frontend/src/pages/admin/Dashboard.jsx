import { IoIosArrowRoundForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
    return(
        <section id="adminDashboard" className="font-poppins bg-babyBlue relative w-full flex min-h-screen overflow-hidden">
            <div className="h-auto">

            </div>
            <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">

                <div className="flex-1">
                    <div className="flex flex-col gap-4 items-center mb-5">
                        <div className="flex flex-col gap-6 mb-10">
                            <h1 className="text-gray-950 text-3xl font-semibold">Halo, selamat datang kembali Admin</h1>
                            <p className="text-gray-500 text-lg leading-relaxed">Selamat datang di arsip dokumen Komisi Penyiaran Daerah Sumatera Selatan</p>
                        </div>

                        <div className="flex flex-row gap-10 mb-10">
                            <div className="flex flex-row gap-5 bg-white p-8 rounded-2xl">
                                <img 
                                    src="/assets/icons/TotalDokumen.png" 
                                    alt="Icon Total Dokumen" 
                                    className="w-16 h-16"
                                />
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-xl font-medium text-gray-950">20 Dokumen</h3>
                                    <p className="text-gray-500 text-lg">Total Dokumen</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 bg-white p-8 rounded-2xl">
                                <img 
                                    src="/assets/icons/PrioritasTinggi.png" 
                                    alt="Icon Total Dokumen" 
                                    className="w-16 h-16"
                                />
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-xl font-medium text-gray-950">20 Dokumen</h3>
                                    <p className="text-gray-500 text-lg">Total Dokumen Prioritas Tinggi</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-row justify-between items-center ">
                                <h1 className="text-3xl text-gray-950 font-semibold">Dokumen Terbaru</h1>
                                <div className="flex flex-row gap-2 items-center group cursor-pointer">
                                    <NavLink 
                                        to="/admin/dokumen"
                                        className="text-xl text-gray-950 group-hover:text-red transition-colors"
                                    >
                                        Lihat semua 
                                    </NavLink>
                                    <IoIosArrowRoundForward 
                                        size="26"
                                        className="text-gray-950 group-hover:text-red transition-colors" 
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};