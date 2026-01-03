import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login({
                email,
                password,
            });

            toast.success("Login berhasil!");

            const role = result.role;

            if (role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else if (role === "user") {
                navigate("/user/dashboard", { replace: true });
            }

        } catch (err) {
            const message = err.response?.data?.message || "Login gagal";
            toast.error(message);
            setError(message);
        }
    };
    
    return(
        <section id="login" className="font-poppins min-h-screen flex items-center py-8">
            <div className="w-full flex flex-col lg:flex-row items-center gap-10">

                {/* SECTION FORM */}
                <div className="w-full lg:w-1/2 px-6 lg:px-16">
                    <div className="max-w-xl mx-auto lg:ml-auto flex flex-col gap-8">
                        <div className="flex flex-row gap-5 items-center mb-20">
                            <img 
                                src="/assets/logo/logoKPID.png" 
                                className="w-20 h-20"
                            />
                            <p className="text-gray-800 text-xl font-medium">Komisi Penyiaran Indonesia Daerah Sumatera Selatan</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h1 className="text-4xl font-semibold text-gray-800 ">Log In</h1>
                            <p className="text-lg text-gray-500">Masukkan alamat email dan kata sandi untuk masuk ke akun Anda.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 w-full">
                            <div className="flex flex-col gap-4 w-full">
                                <label htmlFor="email" className="text-lg font-medium text-gray-800">Email</label>
                                <input 
                                    type="text" 
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukkan email"
                                    className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <label htmlFor="password" className="text-lg font-medium text-gray-800">Kata Sandi</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan kata sandi"
                                    className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-red text-white text-lg rounded-xl px-5 py-3 w-full mt-10 hover:scale-[1.02] transition-transform cursor-pointer"
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                </div>

                {/* SECTION HERO */}
                <div className="hidden lg:flex w-3/5 h-screen relative items-end justify-center px-6 lg:px-18 overflow-hidden">
                    <img 
                        src="/assets/heroLogin.svg" 
                        className="w-full h-full object-contain"
                    />
                </div>

            </div>
        </section>
    );
};