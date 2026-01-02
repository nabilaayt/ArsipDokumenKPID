import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function DropDownBulan({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const months = [
        { id: "all", name: "Semua Bulan", value: "all" },
        { id: 1, name: "Januari", value: 1 },
        { id: 2, name: "Februari", value: 2 },
        { id: 3, name: "Maret", value: 3 },
        { id: 4, name: "April", value: 4 },
        { id: 5, name: "Mei", value: 5 },
        { id: 6, name: "Juni", value: 6 },
        { id: 7, name: "Juli", value: 7 },
        { id: 8, name: "Agustus", value: 8 },
        { id: 9, name: "September", value: 9 },
        { id: 10, name: "Oktober", value: 10 },
        { id: 11, name: "November", value: 11 },
        { id: 12, name: "Desember", value: 12 },
    ];

    const selectedLabel =
        months.find((m) => m.value === value)?.name || "Bulan";

    return(
        <div className="relative">
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                <div className="relative">
                    <div 
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white gap-2 px-2 sm:px-4 py-2 sm:py-2 text-lg rounded-xl w-full flex items-center text-heading justify-between cursor-pointer select-none"
                    >
                        <span className="text-gray-700 truncate">
                            {selectedLabel}
                        </span>
                        <RiArrowDropDownLine
                            size={34}
                            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                    </div>
                    {isOpen && (
                        <div className="absolute mt-2 w-full bg-white rounded-xl z-10 max-h-60 overflow-y-auto">
                            {months.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        onChange(item.value);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
};