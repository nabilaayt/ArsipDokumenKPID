import SideBar from "../../components/SideBar";
import Topbar from "../../components/TopBar";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

export default function AddDokumen() {
    // const navigate = useNavigate();
    // const { createDokumen } = useDokumen();
    // const { categories } = useCategory();
    // const [fileName, setFileName] = useState("No file chosen");
    // // const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
    // const [form, setForm] = useState({
    //     title: "",
    //     videoUrl: null,
    //     categoryId: "",
    //     description: "",
    //     cover: null,
    // });

    // const handleChange = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.id]: e.target.value,
    //     });
    // };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setFileName(file.name);
    //         setForm({ ...form, cover: file });
    //     } else {
    //         setFileName("No file chosen");
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if(!selectedCategory || !selectedCategory.id) {
    //         toast.error("Please select a category");
    //         return;
    //     }

    //     const addData = {
    //         ...form,
    //         category_id: selectedCategory.id,
    //     };
        
    //     try {
    //         await createDokumen(addData);
    //         toast.success("Course added successfully!");
    //         navigate("/admin/courses");
    //     } catch (error) {
    //         console.error("Failed to add course:", error);
    //         toast.error("Failed to add course.");
    //     }
    // };

    return(
        <section id="addDokumen" className="font-poppins bg-babyBlue relative w-full flex min-h-screen overflow-hidden">
            <div className="h-auto">
                <SideBar />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                <Topbar />
                <div className="flex-1">
                    <div className="flex flex-col w-full relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl p-6 sm:p-8 md:p-10 bg-white gap-10 z-10 px-4 sm:px-6 lg:px-8 mb-5 mt-14">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl text-gray-700 font-bold">Tambah Dokumen</h1>
                            <p className="text-lg text-gray-500 text-center">Lengkapi data dokumen agar dapat dicatat dan diarsipkan ke dalam sistem.</p>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};