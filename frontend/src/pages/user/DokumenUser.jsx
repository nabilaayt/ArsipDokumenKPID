import { useEffect, useState } from "react";
import DropDownPrioritas from "../../components/dokumen/DropDownPrioritas";
import DropDownBulan from "../../components/dokumen/DropDownBulan";
import DropDownTahun from "../../components/dokumen/DropDownTahun";
import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";
import TableDokumen from "../../components/dokumen/TableDokumen";
import PaginationBtn from "../../components/dokumen/PaginationBtn";
import useDoc from "../../hooks/useDoc";

export default function DokumenUser() {
    const { dokumen, loading, fetchDokumen } = useDoc();
    const [prioritas, setPrioritas] = useState(null);
    const [bulan, setBulan] = useState(null);
    const [tahun, setTahun] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchDokumen({ prioritas, bulan, tahun });
    }, [prioritas, bulan, tahun]);

    return(
        <section id="userDashboard" className="font-poppins bg-babyBlue relative w-full flex min-h-screen overflow-hidden">
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
                            <DropDownPrioritas
                                value={prioritas}
                                onChange={setPrioritas}
                            />

                            <DropDownBulan
                                value={bulan}
                                onChange={setBulan}
                            />
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