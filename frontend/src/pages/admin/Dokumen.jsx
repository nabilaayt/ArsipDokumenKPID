import { NavLink } from "react-router-dom";
import DropDownKlasifikasi from "../../components/DropDownKlasifikasi";
import DropDownPrioritas from "../../components/DropDownPrioritas";
import DropDownWaktu from "../../components/DropDownWaktu";
import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";
import { IoAddOutline } from "react-icons/io5";

export default function Dokumen() {
    return(
        <section id="adminDashboard" className="font-poppins bg-babyBlue relative w-full flex min-h-screen overflow-hidden">
            <div className="h-auto">
                <SideBar />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                <Topbar />
                <div className="flex-1">
                    <div className="flex flex-col px-4 sm:px-6 lg:px-8 gap-4 mt-14 mb-5">
                        <div className="flex flex-row justify-between gap-6 mb-10">
                            <h1 className="text-gray-950 text-2xl font-semibold">Dokumen</h1>
                            <div className="flex flex-row justify-between gap-5">
                                <DropDownKlasifikasi />
                                <DropDownPrioritas />
                                <DropDownWaktu />
                                <div className="flex flex-row gap-3 w-full items-center justify-center text-white px-4 py-2 rounded-xl bg-red hover:scale-[1.02] transition-transform cursor-pointer">
                                    <IoAddOutline size={24} />
                                    <NavLink
                                        to="/admin/addCourse"
                                        className="text-lg text-white"
                                    >
                                        Tambah Surat
                                    </NavLink>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};