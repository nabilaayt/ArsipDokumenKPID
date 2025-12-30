import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function DropDownPrioritasForm({ value, onChange }) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const options = [
        { id: 1, name: "Normal" },
        { id: 2, name: "Tinggi" },
    ];

    return(
        <div className="relative">
            <ClickAwayListener onClickAway={() => setIsDropdownVisible(false)}>
                <div className="relative">
                    <div 
                        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                        className="bg-babyBlue gap-2 px-2 sm:px-4 py-2 sm:py-2 text-lg rounded-xl w-full flex items-center text-heading justify-between cursor-pointer select-none"
                    >
                        <span className={value ? "text-gray-700" : "text-gray-500"}>
                            {value || "Pilih Prioritas"}
                        </span>
                        <RiArrowDropDownLine 
                            size={34}
                            className={`transition-transform ${isDropdownVisible ? "rotate-180" : ""}`}
                        />
                    </div>
                    {isDropdownVisible && (
                        <div className="absolute mt-2 w-full bg-babyBlue rounded-xl z-10 max-h-60 overflow-y-auto">
                            {options.map((opt) => (
                                <div
                                    key={opt.id}
                                    onClick={() => {
                                        onChange(opt.name);
                                        setIsDropdownVisible(false);
                                    }}
                                    className="px-5 py-3 hover:bg-white cursor-pointer"
                                >
                                    {opt.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
};