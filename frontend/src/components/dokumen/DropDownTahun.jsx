import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function DropDownTahun({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const currentYear = new Date().getFullYear();

    const years = [
        { id: "all", name: "Semua Tahun", value: "all" },
        ...Array.from({ length: 25 }, (_, i) => {
            const year = currentYear - i;
            return { id: year, name: `${year}`, value: year };
        }),
    ];

    const selectedLabel =
        years.find((y) => y.value === value)?.name || "Tahun";

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
                            {years.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        onChange(item.value);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-babyBlue cursor-pointer"
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