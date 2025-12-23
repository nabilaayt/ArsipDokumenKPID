import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoDocumentsOutline } from "react-icons/io5";
import { VscGoToFile } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";

export default function SideBar() {
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const adminPages = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <RxDashboard size={24} /> },
        { name: "Dokumen", path: "/admin/dokumen", icon: <IoDocumentsOutline size={24} /> },
    ];

    const otherPages = [
        { name: "Konversi File", path: "/konversiFile", icon: <VscGoToFile size={24} /> },
    ];

    const renderNavSection = (title, items) => (
        <div className=" flex flex-col gap-2">
            {open && <h4 className="text-gray-700 text-base font-medium px-2">{title}</h4>}
            <ul className="flex flex-col gap-2">
                {items.map((item, idx) => (
                    <li key={idx}>
                        <NavLink
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-5 text-lg transition-all duration-200 ${
                                isActive ? "bg-babyBlue text-gray-700 font-medium" : "text-gray-500 hover:bg-babyBlue hover:text-gray-700 hover:font-medium"
                                } ${open ? "px-3 py-2 rounded-lg" : "justify-center p-3"}`                                
                            }
                        >
                            {item.icon}
                            {open && <span>{item.name}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );

    return(
        <>
            {/* Menu Button for Mobile */}
            <div className="lg:hidden fixed top-0 left-0 w-full bg-white flex items-center justify-between px-4 py-3 z-50">
                <div className="flex gap-4 items-center">
                    <img 
                        src="/assets/logo/logoKPID.png" 
                        alt="Logo KPID" 
                        className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 hover:scale-110"
                    />
                    <h1 className="text-heading text-2xl font-bold text-gray-700">KPID SUMSEL</h1>
                </div>
                <button
                    className="text-heading px-1"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <HiMenuAlt3 size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <nav className={`
                    ${open ? "lg:w-72 lg:p-5 lg:pt-4" : "lg:w-27 lg:p-4 lg:pt-4"} 
                    ${mobileOpen ? "pt-16" : "pt-14 lg:pt-0"}
                    ${mobileOpen ? "translate-x-0 w-full" : "-translate-x-full lg:translate-x-0"}
                    fixed top-0 left-0 lg:static pt-14 lg:pt-0 flex flex-col bg-white h-screen z-40 min-h-screen justify-between ease-in-out transition-all duration-300`}>
                <div className="flex flex-col px-2 pt-4 gap-10 overflow-y-auto">
                    <div className="hidden lg:flex gap-3 items-center cursor-pointer" onClick={() => setOpen(!open)}>
                        <img
                        src="/assets/logo/logoKPID.png"
                        alt="Logo KPID"
                        className="w-14 h-14 sm:w-15 sm:h-15 transition-transform duration-300 hover:scale-110"
                        />
                        <h1 className={`text-heading text-2xl font-semibold transition-all duration-300 ${!open && "hidden"}`}>
                        KPID SUMSEL
                        </h1>
                    </div>
                    {renderNavSection("Menu", adminPages)}
                    {renderNavSection("Lainnya", otherPages)}
                </div>
                <button 
                    onClick={handleLogout}
                    className={`flex items-center py-2 px-2 cursor-pointer gap-4 mb-4 text-gray-500 hover:text-gray-700 hover:bg-babyBlue text-lg hover:font-medium transition-all duration-300 ${open ? "items-start px-6" : "items-center justify-center"}`}
                >
                    <IoLogOutOutline size="26"/>
                    <span className={`${!open && "hidden"} transition-colors`}>Logout</span>
                </button>
            </nav>  
        </>
    );
};