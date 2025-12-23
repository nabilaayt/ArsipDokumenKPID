import { NavLink } from "react-router-dom";
import DropDownPrioritas from "../../components/dokumen/DropDownPrioritas";
import DropDownWaktu from "../../components/dokumen/DropDownWaktu";
import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";
import TableDokumen from "../../components/dokumen/TableDokumen";
import PaginationBtn from "../../components/dokumen/PaginationBtn";
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
                    <div className="flex flex-col px-4 sm:px-6 lg:px-10 gap-4 mt-8 mb-5">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                            <h1 className="text-gray-950 text-2xl font-semibold">Dokumen</h1>
                            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-5">
                                <DropDownPrioritas />
                                <DropDownWaktu />
                                <div className="flex flex-row gap-3 w-full items-center justify-center text-white px-4 py-2 rounded-xl bg-red hover:scale-[1.02] transition-transform cursor-pointer">
                                    <IoAddOutline size={24} />
                                    <NavLink
                                        to="/admin/tambahDokumen"
                                        className="text-lg text-white"
                                    >
                                        Tambah Surat
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <TableDokumen />
                            <PaginationBtn />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};