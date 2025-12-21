import AdminInfo from "./admin/AdminInfo";
import SearchBar from "./SearchBar";

export default function Topbar() {
    return(
        <nav className="flex flex-col sm:flex-col lg:flex-row justify-between bg-white gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 py-6 lg:py-7 mt-16 lg:mt-0 mb-2">
            <SearchBar />
            <div className="flex flex-row gap-4">
                {/* bagian notifikasi kalo jadi */}
                <AdminInfo />
            </div>
        </nav>
    );
};