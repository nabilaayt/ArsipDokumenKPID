import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";

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
                        <div className="flex flex-row gap-6 mb-10">
                            <h1 className="text-gray-950 text-2xl font-semibold">Dokumen</h1>

                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};