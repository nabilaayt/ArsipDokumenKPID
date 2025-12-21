import SideBar from "../components/SideBar";
import Topbar from "../components/TopBar";

export default function KonversiFile() {
    return(
        <section id="konversiFile" className="font-poppins bg-babyBlue relative w-full flex min-h-screen overflow-hidden">
            <div className="h-auto">
                <SideBar />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                <Topbar />
                <div className="flex-1">
                    <div className="flex flex-col px-4 sm:px-6 lg:px-8 gap-4 mt-14 mb-5">
                        <div className="flex flex-col gap-4 mb-8">
                            <h1 className="text-gray-950 text-2xl font-semibold">Konversi File</h1>
                            <p className="text-gray-500 text-lg leading-relaxed">Fitur konversi dokumen untuk mendukung efisiensi pengelolaan arsip dan administrasi KPID Sumatera Selatan.</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};