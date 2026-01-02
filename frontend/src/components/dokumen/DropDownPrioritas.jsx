import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function DropDownPrioritas({value, onChange}) {
    const [open, setOpen] = useState(false);
    const priorities = [
        { value: "all", label: "Semua Prioritas" },
        { value: "Normal", label: "Normal" },
        { value: "Tinggi", label: "Tinggi" },
    ];

    const selectedLabel =
        priorities.find((p) => p.value === value)?.label || "Semua Prioritas";

    return(
        <div className="relative">
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div className="relative">
                    <div 
                        onClick={() => setOpen(!open)}
                        className="bg-white gap-2 px-2 sm:px-4 py-2 sm:py-2 text-lg rounded-xl w-full flex items-center text-heading justify-between cursor-pointer select-none"
                    >
                        <span className="text-gray-700 truncate">
                            {selectedLabel}
                        </span>
                        <RiArrowDropDownLine
                            size={34}
                            className={`transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </div>
                    {open && (
                        <div className="absolute mt-2 w-full bg-white rounded-xl z-10 max-h-60 overflow-y-auto">
                            {priorities.map((item) => (
                                <div
                                    key={item.value}
                                    onClick={() => {
                                        onChange(item.value);
                                        setOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
};