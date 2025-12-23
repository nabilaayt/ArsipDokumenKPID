import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function DropDownKlasifikasi() {
    const [selected, setSelected] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dummyCategories = [
        { id: 1, name: "Surat Masuk" },
        { id: 2, name: "Surat Keluar" },
        { id: 3, name: "Laporan" },
        { id: 4, name: "Peraturan" },
    ];

    const handleClickAway = () => setIsDropdownVisible(false);

    const handleSelect = (category) => {
        setSelected(category);
        setIsDropdownVisible(false);

        // setSelected(category.id);
    };

    // const allCategories = [{ id: "all", name: "All" }, ...categories];
    const allCategories = [{ id: "all", name: "Semua" }, ...dummyCategories];

    return(
        <div className="relative">
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className="relative">
                    <div 
                        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                        className="bg-white gap-2 px-2 sm:px-4 py-2 sm:py-2 text-lg rounded-xl w-full flex items-center text-heading justify-between cursor-pointer select-none"
                    >
                        <span
                            className={`transition-colors duration-200 ${
                                selected ? "text-gray-700" : "text-gray-500"
                            }`}
                        >
                            {selected ? selected.name : "Klasifikasi"}
                        </span>
                        <RiArrowDropDownLine 
                            size={34}
                            className={`transition-all duration-300 ${isDropdownVisible ? "rotate-180" : ""} ${
                                selected ? "text-gray-700" : "text-gray-500"
                            }`}
                        />
                    </div>
                    {isDropdownVisible && (
                        <div className="absolute mt-2 w-full bg-white rounded-xl z-10 max-h-60 overflow-y-auto">
                            {allCategories.map((category, index) => (
                                <div
                                    key={category.id || index}
                                    onClick={() => handleSelect(category)}
                                    className={`px-4 sm:px-6 py-2 sm:text-base md:text-lg cursor-pointer ${
                                        selected === category.name
                                            ? "bg-babyBlue text-heading"
                                            : "hover:bg-babyBlue"
                                    }`}
                                >
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
};