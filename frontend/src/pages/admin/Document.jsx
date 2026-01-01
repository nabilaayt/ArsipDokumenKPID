import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import DropDownPrioritas from "../../components/dokumen/DropDownPrioritas";
import DropDownBulan from "../../components/dokumen/DropDownBulan";
import DropDownTahun from "../../components/dokumen/DropDownTahun";
import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";
import TableDokumen from "../../components/dokumen/TableDocumet";
import PaginationBtn from "../../components/dokumen/PaginationBtn";
import { IoAddOutline } from "react-icons/io5";
import useDoc from "../../hooks/useDoc";

export default function Dokumen() {
    const { dokumen, loading, fetchDokumen } = useDoc();
    const [prioritas, setPrioritas] = useState("all");
    const [bulan, setBulan] = useState("all");
    const [tahun, setTahun] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const params = {};

        if (prioritas && prioritas !== "all") params.prioritas = prioritas;
        if (bulan && bulan !== "all") params.bulan = bulan;
        if (tahun && tahun !== "all") params.tahun = tahun;

        fetchDokumen(params);
    }, [prioritas, bulan, tahun]);

    // Pagination logic
    const safeDokumen = Array.isArray(dokumen) ? dokumen : [];
    const pageCount = Math.ceil(safeDokumen.length / ITEMS_PER_PAGE);
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentData = safeDokumen.slice(offset, offset + ITEMS_PER_PAGE);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
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
                            <div className="flex flex-col md:flex-row w-full lg:w-auto gap-5">
                                <DropDownPrioritas
                                    value={prioritas}
                                    onChange={(val) => {
                                        setPrioritas(val);
                                        setCurrentPage(0);
                                    }}
                                />
                                <DropDownBulan
                                    value={bulan}
                                    onChange={(val) => {
                                        setBulan(val);
                                        setCurrentPage(0);
                                    }}
                                />
                                <DropDownTahun
                                    value={tahun}
                                    onChange={(val) => {
                                        setTahun(val);
                                        setCurrentPage(0);
                                    }}
                                />
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
                            <TableDokumen
                                data={currentData}
                                loading={loading}
                            />
                            {pageCount > 1 && (
                                <PaginationBtn 
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}