import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { IoSearchOutline } from "react-icons/io5";
import { TbX } from "react-icons/tb";
import { getDokumen } from "../services/document";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const [result, setResult] = useState([]);
    const [showDropDown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    const debouncedSearch = useMemo(
        () => 
            debounce(async (value) => {
                if(!value){
                    setResult([]);
                    return;
                }

                const res = await getDokumen({
                    search: value,
                    limit: 5,
                });

                setResult(res.data.payload || []);
                setShowDropdown(true);
            }, 300),
        []
    );

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSearch(value);
    };

    const handleClear = () => {
        setSearchInput("");
        setResult("");
        setShowDropdown(false);
    };

    const handleSelect = (id) => {
        handleClear();

        const role = localStorage.getItem("role");

        if(role === "admin") {
            navigate(`/admin/editDokumen/${id}`)
        }else{
            navigate(`/user/detailDokumen/${id}`)
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div ref={wrapperRef} className="relative w-full max-w-2xl">
            <div className="relative flex p-2 sm:p-3 px-4 sm:px-5 gap-2 w-full max-w-2xl items-center rounded-2xl bg-babyBlue">
                <IoSearchOutline 
                    size={32}
                    className="text-gray-500 rounded-full p-1 shrink-0"
                    onClick={handleSearch}
                />
                <input 
                    type="input" 
                    placeholder="Cari nomor dokumen, perihal, atau kata kunci"
                    value={searchInput}
                    onChange={handleSearch}
                    className={`flex-1 h-full text-lg outline-none border-none overflow-x-auto whitespace-nowrap pr-14 transition duration-300 ${searchInput ? "text-gray-700" : "text-gray-500"}`}
                />
                {searchInput && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 sm:right-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <TbX size={24} />
                    </button>
                )}
            </div>
            
            {/* Dropdown Result */}
            {showDropDown && result.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg max-h-72 overflow-y-auto">
                    {result.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                        >
                            <p className="font-medium text-gray-700">{item.nomor_dokumen}</p>
                            <p className="text-base text-gray-500">{item.perihal} - {item.asal_dokumen}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};