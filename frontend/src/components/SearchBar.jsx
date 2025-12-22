import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { IoSearchOutline } from "react-icons/io5";
import { TbX } from "react-icons/tb";

export default function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState("");

    const debouncedSearch = useMemo(
        () => debounce((value) => onSearch(value), 300),
        [onSearch]
    );

    const handleSearch = async (e) => {
        setSearchInput(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleClear = () => {
        setSearchInput("");
        onSearch("");
    };

    return(
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
                onKeyDown={e => {
                    if(e.key == "Enter") {
                        handleSearch();
                    }
                }}
                className={`flex-1 h-full text-lg outline-none border-none overflow-x-auto whitespace-nowrap pr-14 transition duration-300 ${searchInput ? "text-gray-700" : "text-gray-500"}`}
            />
            {handleSearch && (
                <button
                    onClick={handleClear}
                    className="absolute right-4 sm:right-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    <TbX size={24} />
                </button>
            )}
        </div>
    );
};