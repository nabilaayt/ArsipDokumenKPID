import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// PERBAIKAN: Jalur import diubah dari ../../ menjadi ../
import { login } from "../services/api"; 

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Memanggil fungsi login dari api.js
            const res = await login(email, password);

            // Cek status response dari backend
            if (res.status === 200) {
                const { token, role, nama } = res.payload;

                // Simpan data autentikasi ke storage browser
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                localStorage.setItem("nama", nama);

                toast.success(`Selamat datang, ${nama}!`);
                
                // Arahkan ke dashboard admin setelah login sukses
                navigate("/admin/dashboard");
            } 
        } catch (error) {
            // Menangkap pesan error dari throw di api.js atau masalah jaringan
            toast.error(error.message || "Email atau kata sandi salah!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="login" className="font-poppins min-h-screen flex items-center py-8 bg-white">
            <div className="w-full flex flex-col lg:flex-row items-center gap-10">
                <div className="w-full lg:w-1/2 px-6 lg:px-16">
                    <div className="max-w-xl mx-auto lg:ml-auto flex flex-col gap-8">
                        <div className="flex flex-row gap-5 items-center mb-20">
                            <img src="/assets/logo/logoKPID.png" className="w-20 h-20" alt="Logo KPID" />
                            <p className="text-gray-950 text-xl font-medium">KPID Sumatera Selatan</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h1 className="text-4xl font-semibold text-gray-950">Log In</h1>
                            <p className="text-lg text-gray-500">Masukkan email dan kata sandi Anda untuk mengelola arsip.</p>
                        </div>
                        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col gap-4 w-full">
                                <label className="text-xl font-medium text-gray-950">Email</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@kpid.com"
                                    required
                                    className="w-full rounded-xl px-5 py-3 bg-blue-50 focus:ring-2 focus:ring-red-500 outline-none border border-transparent focus:border-red-500 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <label className="text-xl font-medium text-gray-950">Kata Sandi</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full rounded-xl px-5 py-3 bg-blue-50 focus:ring-2 focus:ring-red-500 outline-none border border-transparent focus:border-red-500 transition-all"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-red-600 text-white text-xl rounded-xl px-5 py-3 w-full mt-10 hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-red-200"
                            >
                                {isLoading ? "Memproses..." : "Log In"}
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* SECTION HERO */}
                <div className="hidden lg:block w-2/3 h-full relative px-6">
                    <img src="/assets/heroLogin.png" className="w-full h-full object-contain" alt="Hero Login" />
                    <div className="absolute bottom-10 left-10 right-10 p-8 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
                        <h2 className="text-white text-2xl font-bold mb-2">Arsip Digital KPID Sumsel</h2>
                        <p className="text-white/90">Sistem pengelolaan dokumen terintegrasi untuk efisiensi administrasi internal.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}